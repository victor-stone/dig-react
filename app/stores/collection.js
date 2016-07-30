import querystring  from 'querystring';
import Query        from './query';
import QueryFilters from './lib/query-filters';
import events       from '../models/events';
import TagStore     from './tags';
import UserSearch   from './user-search';

import { hashParams,
         hashCode,
         quickLoop,
         cleanSearchString,
         TagString }   from '../unicorns';

import makeQueryFilter from '../models/query-filter-make';

/*
*/
class FilterFactory 
{
  constructor({ filters = [] }) {
    
    this._filters = new Map();

    quickLoop( Object.keys(filters), key => {
      const filter = filters[key];
      const { propertyName } = filter;
      this._filters.set( propertyName, filter ); 
    });
    
  }

  get filterClasses() {
    return Array.from(this._filters.values());
  }

  makeFilter( propName ) {
    
    if( this._filters.has(propName) ) {
      return this._filters.get(propName);
    }

    return makeQueryFilter({ propName });
  }
}

const ccMixterFilterFactory = new FilterFactory( { filters: require('../models/filters') });

/*
    This class operates on the properties of a store. Specifically, the 
    properties that are derivations of QueryFilter.

*/
class QueryParameters
{
  constructor({ 
      store,
      filterFactory
    }) 
  {
    this._store     = store;
    this._factory   = filterFactory;
  }

  /*
    injest a hash of query parameters
  */
  deserialize( hash ) {

    const store = this._store;

    store.isFilterEventsDisabled = true;
    quickLoop( Object.keys(hash), propName => this.setFilterValue( propName, hash[propName] ) );
    store.isFilterEventsDisabled = false;

    return this;
  }

  /*
    emit a hash of query parameters 
  */
  serialize() {
    return this._getHash();
  }

  /*
    emit a hash of 'display' values
  */
  values() {

    // The actual current values for the set of query params is a calcuated
    // value. Therefore the values in the native filters can not be relied
    // upon. e.g. the 'tags' native filter's does not necessarily reflect the
    // the current value in the 'instrumentOnly' virtual filter.

    // Step 1. get the current native hash
    //
    const hash = this._getHash();

    // Step 2. apply the native hash to the native filters
    //
    this.deserialize(hash);

    // Step 3. isolate the native filters (their propName is the same as their map index name)
    //
    const nativeFilters = this._store.queryFilters.filter( ([n,f]) => n === f.name );

    // Step 4: fetch the display value for each
    //
    quickLoop( nativeFilters, ([n,f]) => hash[n] = f.value );

    return hash;
  }


  /*
      emit a query string ?foo=bar&etc=fee
  */
  toString() {

    const qp = this._getHash();

    return querystring.stringify(qp);

  }

  /*
      set the native value of a query parameter
  */
  setFilterValue( propName, value ) {
    const store = this._store;
    store.hasProperty( propName ) 
      ? store.getProperty( propName ).deserialize( value )
      : store.addProperty( this._factory.makeFilter( propName ), value );
  }

  _getHash() {
    const store = this._store;    

    const qp = {};

    const virutalFilters = [];

    quickLoop( store.queryFilters, ([propName,filter]) => {
      const { name } = filter;
      if( propName === name ) {
        qp[name] = filter.serialize();
      } else {
        virutalFilters.push(filter);
      }
    });

    quickLoop( virutalFilters, f => qp[f.name] = f.serialize(qp[f.name]) );

    return qp;
  }
}

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
      totals   - hash of totals for reqtags (see lib/totals-cache)

*/
const MIN_GENRE_TAG_SIZE = 2;

class Collection extends QueryFilters(Query) {

  constructor(defaultParams)
  {
    super(...arguments);
    this.model          = {};

    this.gotCache       = false;
    this._tags          = null;

    this.totalsCache    = null;
    this.autoFetchUser  = true;

    this._queryParams = new QueryParameters({ store:this, filterFactory: ccMixterFilterFactory });

    defaultParams && this._queryParams.deserialize( defaultParams );
  }

  get supportsOptions() {
    return true;
  }

  get queryString() {
    const qs = this._queryParams.toString();
    return qs ? '?' + qs : '';
  }

  get queryStringWithDefaults() {
    return this._queryParams.toString(true);
  }

  get queryParams() {
    return this._queryParams.values();
  }
  
  onModelUpdated(handler) {
    this.on( events.MODEL_UPDATED, handler );
  }

  _applyAndGetAP(qp) {
    return this._queryParams.deserialize(qp).serialize();
  }

  refresh(queryParams) {
    var qp = this._applyAndGetAP(queryParams);
    return this.fetch(qp)
                .then( items => {
                  this.model.items = items;
                  this.onModelSuccess(this.model,qp);
                  return this.model;
                }, e => this.onModelError(e,qp) );
  }

  refreshModel(queryParams) {
    queryParams.offset = 0;
    var qp = this._applyAndGetAP(queryParams);
    return this.getModel( qp );
  }

  getModel( queryParams ) {
    var qp = this._applyAndGetAP(queryParams);

    if( this.totalsCache ) {
      return this.doTotalsCachePreFetch(qp);
    }
    return this._getModel(qp);
  }

  _getModel(queryParams) {

    if( !('dataview' in queryParams) && !('t' in queryParams) ) {
      queryParams.dataview = 'links_by';
    }
    
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

        const userOpts = {  
          limit: 40,
          remixmin: 1,
          searchp: text
        };

        hash.artists = this.userSearch.searchUsers(userOpts,'artists', this );
        hash.genres = this.tagStore.searchTags( tagsFromText, 'genres', this );
      }
    }

    if( this.totalsCache ) {
      hash.totals = this.totalsCache.getTotals(queryParams,this);
    }
    
    hash = this.promiseHash(hash,queryParams);
    
    this.error = null;

    return this.flushDefers(hash)
                 .then( m => this.onModelSuccess(m,queryParams),
                        e => this.onModelError(e, queryParams) );
  }

  onModelSuccess(model,queryParams) {
    this.model = model;
    model.queryParams = Object.assign( {}, queryParams );
    this.notifyPaging(model,queryParams);
    this.emit( events.MODEL_UPDATED, model );
    return model;    
  }

  notifyPaging() {

    const { 
      total, 
      items: { length }, 
      queryParams: { 
        offset = 0,
        limit 
      } 
    } = this.model;

    this.setQueryParamValue( 'offset', { offset, limit, total, length } );
  }

  /*
    set a queryParam's native value
  */
  setQueryParamValue( name, nativeValue ) {
    this.isFilterEventsDisabled = true;
    this._queryParams.setFilterValue( name, nativeValue );
    this.isFilterEventsDisabled = false;    
  }

  onModelError( e, queryParams ) {
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
  }

  /* protected */

  promiseHash( hash /*, queryParams */) {
    return hash;
  }

  // TODO: investigate generalizing cachedFetch
  
  cachedFetch(queryParams, deferName) {
    if( !this.gotCache ) {
      // tell ccHost to use a cache if it's there
      var qp = Object.assign( {}, queryParams);
      qp['cache'] = '_' + hashCode(hashParams(queryParams));
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

  // TODO: this and all mention of 'reqtags' need to be factored out of here
  
  get currentReqtag() {
    return this.totalsCache.filter(this.model.queryParams.reqtags).toString();
  }

  get tagStore() {
    !this._tags && (this._tags = new TagStore());
    return this._tags;
  }

  get userSearch() {
    !this._userSearch && (this._userSearch = new UserSearch());
    return this._userSearch;
  }

  profileFor(user,deferName) {
    return this.userSearch.findUser(user,deferName,this);
  }

  doTotalsCachePreFetch(queryParams) {
    const { totalsCache } = this;
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
  
}

module.exports = Collection;
