import querystring from 'querystring';
import rsvp        from 'rsvp';
import Query       from './query';
import events      from '../models/events';
import Tags        from './Tags';

import { oassign,
         TagString }   from '../unicorns';

class UploadList extends Query {

  constructor(defaultParams) {
    super(...arguments);
    this.model         = {};
    this.defaultParams = defaultParams || {};
    this._tags         = null;
  }

  get queryString() {
    var copy = {};
    var qp   = this.model.queryParams;
    var defs = this.defaultParams;
    var skip = [ 'f', 'dataview'];
    var tags = [ 'tags', 'reqtags' ];
    for( var k in qp ) {
      if( !skip.includes(k) ) {
        if( k === 'offset' ) {
          if( qp.offset !== 0 ) {
            copy.offset = qp.offset;
          }
        } else {
          if( k in defs ) {
            if( tags.includes(k) ) {
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
    var qp     = oassign( {}, this.model.queryParams );
    qp.tags    = new TagString(qp.tags);
    qp.reqtags = new TagString(qp.reqtags);
    return qp;
  }
  
  get tags() {
    if( !this._tags ) {
      this._tags = new Tags();
    }
    return this._tags;
  }

  applySoftParams(queryParams) {
    queryParams.offset = 0;
    return this._applySoftParams(this._qp(queryParams));
  }

  paginate(offset) {
    return this._applySoftParams(this._qp({offset}));
  }

  applyTags(tags) {
    var qp = { tags: tags.toString() };
    return this.applyHardParams(qp);    
  }

  applyURIQuery(qp) {
    return this.applyHardParams(qp);    
  }

  applyHardParams(queryParams) {
    queryParams.offset = 0;
    return this.getModel(this._qp(queryParams));
  }

  supportsOptions() {
    return true;
  }

  applyDefaults() {
    this.defaultParams.offset = 0;
    return this.getModel(this._qp(this.defaultParams));
  }

  paramsDirty() {
    var qp   = oassign( {}, this.model.queryParams );
    qp.reqtags = new TagString(qp.reqtags);
    qp.tags    = new TagString(qp.tags);
    var def  = oassign( {}, this.defaultParams );
    def.reqtags = new TagString(def.reqtags);
    def.tags    = new TagString(def.tags);
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

  _qp(queryParams) {
    var qp = this.model.queryParams;
    oassign( qp, queryParams);
    var qpt     = oassign( {}, qp );
    qpt.tags    = new TagString(qp.tags);
    qpt.reqtags = new TagString(qp.reqtags);
    this.emit( events.PARAMS_CHANGED, qpt, this );
    return qp;
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
