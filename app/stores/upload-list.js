import querystring from 'querystring';
import rsvp        from 'rsvp';
import Query       from './query';
import { oassign,
       TagString } from '../unicorns';
import events      from '../models/events';
import Tags        from './Tags';

class UploadList extends Query {

  constructor(defaultParams) {
    super(...arguments);
    this.model         = {};
    this.defaultParams = defaultParams || { lic: 'all' };
    this._tags         = null;
  }

  get queryString() {
    var copy = {};
    var qp = this.model.queryParams;
    var skip = [ 'f', 'dataview'];
    for( var k in qp ) {
      if( !skip.includes(k) ) {
        if( k !== 'offset' || qp[k] !== 0 ) {
          copy[k] = qp[k];
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
      this._tags.setSelected(this.model.queryParams.tags);
      //this._tags.on( event.TAGS_CHANGED, this._onTagsChanged.bind(this) );
    }
    return this._tags;
  }

  _onTagsChanged(tags) {
    this.applyHardParams( { tags: tags.toString() } );
  }

  applySoftParams(queryParams) {
    queryParams.offset = 0;
    return this._applySoftParams(this._qp(queryParams));
  }

  paginate(offset) {
    return this._applySoftParams(this._qp({offset}));
  }

  _applySoftParams(queryParams) {
    return this.fetch(queryParams).then( playlist => {
      this.model.playlist = playlist;
      this.emit( events.MODEL_UPDATED );
      return this.model;
    });
  }

  applyHardParams(queryParams) {
    queryParams.offset = 0;
    return this.getModel(this._qp(queryParams));
  }

  supportsOptions() {
    return !!this.defaultParams;
  }

  _qp(queryParams) {
    oassign( this.model.queryParams, queryParams);
    var qp     = oassign( {}, this.model.queryParams );
    qp.tags    = new TagString(qp.tags);
    qp.reqtags = new TagString(qp.reqtags);
    this.emit( events.PARAMS_CHANGED, qp, this );
    return this.model.queryParams;
  }

  applyDefaults() {
    this.getModel( this.defaultParams );
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

  promiseHash( hash /*, queryParams */) {
    return hash;
  }

}

module.exports = UploadList;
