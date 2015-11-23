import UploadList       from './upload-list';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import Tags             from './tags';
//import rsvp             from 'rsvp';


class Samples extends UploadList {

  constructor() {
    super(...arguments);
    this.tags = new Tags();
  }
  /* protected */

  fetch(queryParams) {
    queryParams.dataview = 'default'; // links_by doesn't have bpm
    return this.query(queryParams).then( serialize( ccmixter.Sample ) );
  }

  promiseHash( hash, queryParams ) {
    hash.artist = queryParams.u ? this.findUser(queryParams.u) : null;
    return hash;
  }
}

Samples.storeFromQuery = function(params) {
  var pells = new Samples();
  return pells.getModel(params).then( () => pells );  
};

module.exports = Samples;

