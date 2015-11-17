import UploadList       from './upload-list';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
//import rsvp             from 'rsvp';


class Samples extends UploadList {

  /* protected */

  fetch(queryParams) {
    queryParams.dataview = 'default'; // links_by doesn't have bpm
    return this.query(queryParams).then( serialize( ccmixter.Upload ) );
  }

}

Samples.storeFromQuery = function(params) {
  var pells = new Samples();
  return pells.getModel(params).then( () => pells );  
};

module.exports = Samples;

