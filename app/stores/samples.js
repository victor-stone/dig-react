import UploadList       from './upload-list';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import Tags             from './tags';

class Samples extends UploadList {

  constructor() {
    super(...arguments);
    this._tags = null;
  }

  get tags() {
    if( !this._tags ) {
      this._tags = new Tags();
    }
    return this._tags;
  }

  /* protected */

  fetch(queryParams) {
    queryParams.dataview = 'default'; // links_by doesn't have bpm
    return this.query(queryParams).then( serialize( ccmixter.Sample ) );
  }

  promiseHash( hash, queryParams ) {
    if( queryParams.tags && (!tags || !tags.getSelectedTags()) ) {
      var tags = this.tags;
      tags.addSelected(queryParams.tags);
    }
    hash.artist = queryParams.u ? this.findUser(queryParams.u) : null;
    return hash;
  }
}

Samples.storeFromQuery = function(params,defaults) {
  var samples = new Samples();
  samples.orgParams = defaults;
  return samples.getModel(params).then( () => samples );  
};

module.exports = Samples;

