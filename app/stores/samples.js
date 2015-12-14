import Uploads          from './uploads';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';

class Samples extends Uploads {   

  fetch(queryParams) {
    queryParams.dataview = 'default'; // links_by doesn't have bpm
    return this.query(queryParams).then( serialize( ccmixter.Sample ) );
  }
}

Samples.storeFromQuery = function(params,defaults) {
  var samples = new Samples(defaults);
  return samples.getModel(params).then( () => { return samples; } );  
};

module.exports = Samples;

