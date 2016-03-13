import querystring from 'querystring';
//import rsvp        from 'rsvp';
import Query       from './query';
import events      from '../models/events';
import Tags        from './tags';

import { oassign,
         hashParams,
         cleanSearchString,
         TagString }   from '../unicorns';

class UploadList extends Query {

  constructor(defaultParams) {
    super(...arguments);
    this.model         = {};
    this.defaultParams = defaultParams || {};
    this.gotCache      = false;
    this._tags         = null;
    this.tagFields     = ['tags', 'reqtags', 'oneof'];
  }

  get supportsOptions() {
    return true;
  }

  get queryString() {
    return this._queryString(false);
  }

  get queryStringWithDefaults() {
    return this._queryString(true);
  }

  get queryParams() {
    return this._expandQP(this.model.queryParams);
  }
  
  get tags() {
    if( !this._tags ) {
      this._tags = new Tags();
    }
    return this._tags;
  }

  paginate(offset) {
    return this._refresh(this._qp({offset},events.PARAMS_CHANGED));
  }

  applyTags(tags) {
    var qp = { tags: tags.toString() };
    return this.refreshHard(qp);    
  }

  applyURIQuery(qp) {
    return this.refreshHard(qp);    
  }

  refresh(queryParams) {
    queryParams.offset = 0;
    return this._refresh(this._qp(queryParams,events.PARAMS_CHANGED));
  }

  refreshHard(queryParams) {
    queryParams.offset = 0;
    return this.getModel(this._qp(queryParams,events.PARAMS_CHANGED));
  }

  applyDefaults() {
    return this._applyDefaults([events.GET_PARAMS_DEFAULT]);
  }

  applyURIDefault() {
    return this._applyDefaults([ events.GET_PARAMS_DEFAULT, events.GET_PARAMS_URI ]);
  }

  paramsDirty() {
    var qp      = this._expandQP(this.model.queryParams);
    var def     = this._expandQP(this.defaultParams);
    var isDirty = { isDirty: false };
    this.emit( events.ARE_PARAMS_DIRTY, qp, def, isDirty );
    return isDirty.isDirty;
  }

  getModel(queryParams) {
    if( !('dataview' in queryParams) && !('t' in queryParams) ) {
      queryParams.dataview = 'links_by';
    }
    
    queryParams.offset = queryParams.offset || 0;

    var hasSearch = 'searchp' in queryParams;

    if( hasSearch ) {
      queryParams.searchp = cleanSearchString( queryParams.searchp );
    }

    var user = queryParams.u || queryParams.user;

    var hash = {
      items:  this.cachedFetch(queryParams,'items'),
      total:  this.count(queryParams,'total'),
      artist: user ? this.findUser(user,'artist') : null,
    };

    if( hasSearch) {
      var text = queryParams.searchp;

      hash.artists = [];
      hash.genres  = [];

      if( text ) {
        hash.artists = this.searchUsers({
                    limit: 40,
                    remixmin: 1,
                    searchp: text
                  },'artists');
        hash.genres = this.tags.searchTags( text.split(/\s/).filter( t => t.length > 2 ), 'genres' );
      }
    }

    hash = this.promiseHash(hash,queryParams);
    
    this.error = null;

    return this.flushDefers(hash).then( model => {
      this.model = model;
      model.queryParams = oassign( {}, queryParams );
      this.emit( events.MODEL_UPDATED, model );
      return model;
    }).catch( e => {
      if( e.message === events.ERROR_IN_JSON ) {
        this.model.items = [];
        this.model.total = 0;
        this.model.error = this.error = e.message;
        this.model.artist = {};
        this.model.queryParams = oassign( {}, queryParams );
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

  cachedFetch(queryParams, deferName) {
    if( !this.gotCache ) {
      var qp = oassign( {}, queryParams);
      qp['cache'] = '_' + hashParams(queryParams).hashCode();
      this.gotCache = true;
      queryParams = qp;
    }
    return this.fetch(queryParams,deferName);
  }

  /* private */

  _expandQP(queryParams) {
    var qp   = oassign( {}, queryParams );
    this.tagFields.forEach( f => qp[f] = new TagString(qp[f]) );
    return qp;
  }

  _contractQP(queryParams,result) {
    for( var k in queryParams ) {
      if( this.tagFields.includes(k) ) {
        if( queryParams[k].getLength() > 0 ) {
          result[k] = queryParams[k].toString();
        }
      } else if( k === 'offset' ) {
        if( queryParams.offset > 0 ) {
          result.offset = queryParams.offset;
        }
      } else {
        if( queryParams[k] !== null && typeof queryParams[k] !== 'undefined') {
          result[k] = queryParams[k];
        }
      }
    }
    return result;
  }

  _qp(queryParams,event) {
    var qp = this.model.queryParams;
    oassign( qp, queryParams); // paste over model's queryParams
    var qpt  = this._expandQP(qp);
    this.emit( event, qpt, this );
    return qp;
  }

  _applyDefaults(events) {
    var qp  = oassign( {}, this.model.queryParams, this.defaultParams, { offset: 0 } );
    var qpt = this._expandQP(qp);
    events.forEach( e => this.emit( e, qpt, this ) );
    var qpc = this.model.queryParams = this._contractQP( qpt, {} );
    return this.refreshHard(qpc);
  }

  _refresh(queryParams,deferName) {
    return this.fetch(queryParams,deferName).then( items => {
      this.model.items = items;
      this.emit( events.MODEL_UPDATED );
      return this.model;
    });
  }

  _queryString(withDefault) {
    var qp   = this.model.queryParams;
    var defs = this.defaultParams;
    var copy = withDefault ? oassign( {}, defs) : {};
    var skip = [ 'f', 'dataview'];

    for( var k in qp ) {
      if( !skip.includes(k) ) {
        if( k === 'offset' ) {
          if( qp.offset > 0 ) {
            copy.offset = qp.offset;
          }
        } else {
          if( !withDefault && k in defs ) {
            if( this.tagFields.includes(k) ) {
              if( qp[k] && !(new TagString(defs[k])).isEqual(qp[k]) ) {
                copy[k] = qp[k];
              }
            } else {
              if( qp[k] !== defs[k] ) {
                copy[k] = qp[k];
              }
            }
          } else {
            if( qp[k] ) {
              copy[k] = qp[k];
            }
          }
        }
      }
    }
    return querystring.stringify(copy);    
  }
}

module.exports = UploadList;
