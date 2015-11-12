import Query       from './query';
import rsvp        from 'rsvp';
import { oassign } from '../unicorns';

class UploadList extends Query {

  constructor() {
    super(...arguments);
    this.model = {};
    this.orgParams = null;
  }

  perform() {
    this._performWithEvent('get');
  }

  performClean() {
    this._performWithEvent('set-default');
  }

  paramsDirty() {
    var isDirty = { isDirty: false };
    this.emit('query-params', 'is-dirty', isDirty );
    return isDirty.isDirty;
  }

  getModel(queryParams) {
    if( !this.orgParams ) {
      this.orgParams = oassign( {},  queryParams);
    }
    queryParams.dataview = 'links_by';
    queryParams.f        = 'json';
    queryParams.offset   = queryParams.offset || 0;
    var hash = {
      playlist: this.fetch(queryParams),
      total:    this.count(queryParams)
    };
    hash = this.promiseHash(hash,queryParams);
    return rsvp.hash(hash).then( model => {
      this.model = model;
      model.queryParams = oassign( {}, queryParams );
      this.emit('playlist', model );
      return model;
    });
  }

  promiseHash( hash /*, queryParams */) {
    return hash;
  }

  _performWithEvent( eventName ) {
    var queryParams = oassign({},this.orgParams || {});
    this.emit('query-params',eventName,queryParams);
    this.getModel(queryParams);    
  }
}

module.exports = UploadList;
