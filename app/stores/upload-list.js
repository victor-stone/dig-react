import querystring from 'querystring';
import rsvp        from 'rsvp';
import Query       from './query';
import events      from '../models/events';
import Tags        from './tags';

import { oassign,
         TagString }   from '../unicorns';

const TAG_FIELDS = ['tags', 'reqtags', 'oneof'];

class UploadList extends Query {

  constructor(defaultParams) {
    super(...arguments);
    this.model         = {};
    this.defaultParams = defaultParams || {};
    this._tags         = null;
  }

  get supportsOptions() {
    return true;
  }

  get queryString() {
    var copy = {};
    var qp   = this.model.queryParams;
    var defs = this.defaultParams;
    var skip = [ 'f', 'dataview'];

    for( var k in qp ) {
      if( !skip.includes(k) ) {
        if( k === 'offset' ) {
          if( qp.offset > 0 ) {
            copy.offset = qp.offset;
          }
        } else {
          if( k in defs ) {
            if( TAG_FIELDS.includes(k) ) {
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
    return this._applySoftParams(this._qp({offset},events.PARAMS_CHANGED));
  }

  applyTags(tags) {
    var qp = { tags: tags.toString() };
    return this.applyHardParams(qp);    
  }

  applyURIQuery(qp) {
    return this.applyHardParams(qp);    
  }

  applySoftParams(queryParams) {
    queryParams.offset = 0;
    return this._applySoftParams(this._qp(queryParams,events.PARAMS_CHANGED));
  }

  applyHardParams(queryParams) {
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
    queryParams.f        = 'js';
    queryParams.dataview = 'links_by';
    queryParams.offset   = queryParams.offset || 0;
    
    var hash = {
      playlist: this.fetch(queryParams),
      total:    this.count(queryParams),
      artist:   queryParams.u ? this.findUser(queryParams.u) : null,
    };

    if( queryParams.searchp ) {
      var text = queryParams.searchp.replace(/[^a-zA-Z0-9 _()\*\.]/,'');

      if( text ) {
        hash.artists = this.searchUsers({
                    limit: 40,
                    remixmin: 1,
                    searchp: text
                  });
        hash.genres = this.tags.searchTags( text.split(/\s/).filter( t => t.length > 2 ) );
      } else {
        hash.artists = [];
        hash.genres  = [];
      }
    }

    hash = this.promiseHash(hash,queryParams);
    
    return rsvp.hash(hash).then( model => {
      this.model = model;
      model.queryParams = oassign( {}, queryParams );
      this.emit( events.MODEL_UPDATED, model );
      return model;
    }).catch( e => {
      var str = /*decodeURIComponent*/(querystring.stringify(queryParams));
      throw new Error( `${str} original: ${e.toString()}-${e.stack}`);
    });

  }

  /* protected */

  promiseHash( hash /*, queryParams */) {
    return hash;
  }

  /* private */

  _expandQP(queryParams) {
    var qp   = oassign( {}, queryParams );
    qp.reqtags = new TagString(qp.reqtags);
    qp.tags    = new TagString(qp.tags);
    qp.oneof   = new TagString(qp.oneof);
    return qp;
  }

  _contractQP(queryParams,result) {
    for( var k in queryParams ) {
      if( TAG_FIELDS.includes(k) ) {
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
    return this.applyHardParams(qpc);
  }

  _applySoftParams(queryParams) {
    return this.fetch(queryParams).then( playlist => {
      this.model.playlist = playlist;
      this.emit( events.MODEL_UPDATED );
      return this.model;
    });
  }

}

module.exports = UploadList;
