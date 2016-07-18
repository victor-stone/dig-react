import Collection from './collection';
import ccmixter   from '../models/ccmixter';
import serialize  from '../models/serialize';

class Samples extends Collection {   

  constructor() {
    super(...arguments);
    this.breakHere = true;
  }

  fetch(queryParams,deferName) {
    queryParams.dataview = 'default'; // links_by doesn't have bpm
    return this.query(queryParams,deferName).then( serialize( ccmixter.Sample ) );
  }
}

Samples.storeFromQuery = function(params,defaults) {
  var samples = new Samples(defaults);
  return samples.getModel(params).then( () => { return samples; } );  
};

module.exports = Samples;

