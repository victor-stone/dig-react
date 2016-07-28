import querystring  from 'querystring';
import Query        from './query';
import QueryFilters from './tools/query-filters';
import events       from '../models/events';
import Tags         from './tags';
import UserSearch   from './user-search';

import { hashParams,
         cleanSearchString,
         TagString }   from '../unicorns';


/*
  Collection stores support, a minimum, a model that
  has :
    model {
      items - array
      total - Number
    }
  Depending on the query string used for getModel() 
  it may also include:
      artist   -  'user' a profile of an user
      artists  - 'searchp' search results in user database
      genres   - 'searchp' search results in genre tags
      totals   - hash of totals for reqtags (see ./tools/totals-cache)

*/
const MIN_GENRE_TAG_SIZE = 2;

class Collection extends QueryFilters(Query) {

  constructor(defaultParams) {
    super(...arguments);
    this.model         = {};
    this._defaultParams = defaultParams || {};
    this.gotCache      = false;
    this._tags         = null;
    this.tagFields     = ['tags', 'reqtags', 'oneof'];
    this.totalsCache   = null;
    this.autoFetchUser = true;
  }

  get supportsOptions() {
    return true;
  }

  get defaultParams() {
    return this._defaultParams;
  }

  get queryString() {
    const qs = this._queryString(false);
    return qs ? '?' + qs : '';
  }

  get queryStringWithDefaults() {
    return this._queryString(true);
  }

  get queryParams() {
    return this._expandQP(this.model.queryParams);
  }
  
  get tagStore() {
    !this._tags && (this._tags = new Tags());
    return this._tags;
  }

  get userSearch() {
    !this._userSearch && (this._userSearch = new UserSearch());
    return this._userSearch;
  }

  onModelUpdated(handler) {
    this.on( events.MODEL_UPDATED, handler );
  }

  paginate(offset) {
    return this._refresh(this._qp({offset}));
  }

  // use this instead of the property if you
  // need the return promise
  applyTags(tags) {
    var qp = { tags: tags.toString() };
    return this.refreshModel(qp).then( model =>{
      this.emit(events.TAGS_SELECTED);
      return model;
    });
  }

  refresh(queryParams) {
    queryParams.offset = 0;
    return this._refresh(this._qp(queryParams));
  }

  refreshModel(queryParams) {
    queryParams.offset = 0;
    return this.getModel(this._qp(queryParams));
  }

  getModel( queryParams ) {
    const { totalsCache } = this;
    if( totalsCache ) {
      const { reqtags } = queryParams;
      var tag = totalsCache.cacheableTagFromTags( reqtags );
      if( tag ) {
        /*
          There's been a query for a reqtag that's part of the 
          'totals' count. Tell the cache to create/fetch all
          the totals. The result of this will be picked up
          in _getModel.
        */
        return totalsCache.getTotals(queryParams,this).then( totals => {
          /*
              WARNING: BIG POLICY ASSUMPTION BURIED IN THE BOWELS AHEAD:

              The use case assumed here is that there are several nav tabs
              that represent reqtags. 

              There are several cases within that scenario where the 
              requesting nav tab (i.e. reqtag) return no results (like
              the default tab 'edpick' for a user that doesn't have 
              any edpicks or if the url goes directly to 'spoken word'
              for a bpm filtered acappella query that returns no 
              results, etc. etc.)

              In that case we assume the caller will want the 'all'
              case returned and will notice when checking the 'totals'
              part of the model that the requested reqtag doesn't
              have any results.

              TODO: don't assume this behavoir and have a policy flag 
                    to determine how to handle these cases.

          */
          if( !totals[tag] ) {
            queryParams.reqtags = new TagString(reqtags).remove(tag).toString();
          }
          /*
            OK, the 'totals' cache has been set up, now it time to get the
            actual query requested here.
          */
          return this._getModel(queryParams);
        });
      }
    }
    return this._getModel(queryParams);
  }

  _getModel(queryParams) {
    if( !('dataview' in queryParams) && !('t' in queryParams) ) {
      queryParams.dataview = 'links_by';
    }
    
    queryParams.offset = queryParams.offset || 0;

    var hasSearch = 'searchp' in queryParams;

    if( hasSearch ) {
      queryParams.searchp = cleanSearchString( queryParams.searchp );
    }

    if( queryParams.u ) {
      queryParams.user = queryParams.u;
      delete queryParams.u;
    }

    var user = queryParams.user;

    var hash = {
      items:  this.cachedFetch(queryParams,'items'),
      total:  this.count(queryParams,'total'),
      artist: (user && this.autoFetchUser) ? this.profileFor(user,'artist') : null,
    };

    if( hasSearch) {
      var text = queryParams.searchp;

      hash.artists = [];
      hash.genres  = [];

      if( text ) {
        const tagsFromText = text.split(/\s/).filter( t => t.length > MIN_GENRE_TAG_SIZE );

        const userOpts = {  limit: 40,
                            remixmin: 1,
                            searchp: text };

        hash.artists = this.userSearch.searchUsers(userOpts,'artists', this );
        hash.genres = this.tagStore.searchTags( tagsFromText, 'genres', this );
      }
    }

    if( this.totalsCache ) {
      hash.totals = this.totalsCache.getTotals(queryParams,this);
    }
    
    hash = this.promiseHash(hash,queryParams);
    
    this.error = null;

    return this.flushDefers(hash).then( model => {
      this.model = model;
      model.queryParams = Object.assign( {}, queryParams );
      this.emit( events.MODEL_UPDATED, model );
      return model;
    }).catch( e => {
      if( e.message === events.ERROR_IN_JSON ) {
        this.model.items = [];
        this.model.total = 0;
        this.model.error = this.error = e.message;
        this.model.artist = {};
        this.model.queryParams = Object.assign( {}, queryParams );
        return this.model;
      } else {
        var str = /*decodeURIComponent*/(querystring.stringify(queryParams));
        throw new Error( `${str} original: ${e.toString()}-${e.stack}`);
      }
    });

  }

  /* protected */

  promiseHash( hash /*, queryParams */) {
    return hash;
  }

  profileFor(user,deferName) {
    return this.userSearch.findUser(user,deferName,this);
  }
  // TODO: investigate generalizing cachedFetch
  
  cachedFetch(queryParams, deferName) {
    if( !this.gotCache ) {
      // tell ccHost to use a cache if it's there
      var qp = Object.assign( {}, queryParams);
      qp['cache'] = '_' + hashParams(queryParams).hashCode();
      // we're only doing this once per instance of this class, here's why:
      // we don't want the cache at ccHost to grow needlessly. Roughly 99.999%
      // of users come to dig and ccMixter and see the same 5 pages. If all
      // we do is cache the first page seen at a query (as opposed to later 
      // offsets or tag searchers) the site will be plenty responsive and
      // the biggest load will be off of the server db.
      this.gotCache = true;
      queryParams = qp;
    }
    return this.fetch(queryParams,deferName);
  }

  /* private */

  _expandQP(queryParams) {
    var qp   = Object.assign( {}, queryParams );
    this.tagFields.forEach( f => qp[f] = new TagString(qp[f]) );
    return qp;
  }

  _qp(queryParams) {

    // paste over model's queryParams
    const qp = this.model.queryParams;

    for( var k in queryParams ) {

      let value = queryParams[k];

      // TagStrings and Number will become strings here
      value = ( typeof value === 'undefined' || value === null ) ? '' : value + '';

      if( value.length ) {
        qp[k] = value;
      } else if( k in qp ) {
        // the parameter k used to have a value, now it doesn't
        delete qp[k];
      }

    } 

    return qp;
  }

  _refresh(queryParams,deferName) {
    return this.fetch(queryParams,deferName).then( items => {
      this.model.items = items;
      this.emit( events.MODEL_UPDATED );
      return this.model;
    });
  }

  _queryString(withDefault) {
    const qp   = this.model.queryParams;
    const defs = this._defaultParams;
    const copy = withDefault ? Object.assign( {}, defs) : {};
    const skip = [ 'f', 'dataview', 'reqtags'];

    for( const paramName in qp ) {
      if( skip.includes(paramName) ) {
        continue;
      }
      const value = qp[paramName];
      if( paramName === 'offset' ) {
        if( qp.offset > 0 ) {
          copy.offset = value;
        }
      } else {
        if( !withDefault && paramName in defs ) {
          if( this.tagFields.includes(paramName) ) {
            if( value && !(new TagString(defs[paramName])).isEqual(value) ) {
              copy[paramName] = value;
            }
          } else {
            if( value + '' !== defs[paramName] + '' ) {
              copy[paramName] = value;
            }
          }
        } else {
          if( value ) {
            copy[paramName] = value;
          }
        }
      }
    }
    return querystring.stringify(copy);    
  }

  // TODO: this and all mention of 'reqtags' need to be factored out of here
  
  get currentReqtag() {
    return this.totalsCache.filter(this.model.queryParams.reqtags).toString();
  }


}

module.exports = Collection;
