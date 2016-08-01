import Collection from './collection';
import ccmixter   from '../models/ccmixter';
import serialize  from '../models/serialize';

class Samples extends Collection 
{

  fetch(queryParams,deferName) {

    queryParams.dataview = 'default'; // links_by doesn't have bpm
    
    return this.query(queryParams,deferName).then( serialize( ccmixter.Upload.Sample ) );
  }

  static fromQuery( params ) {

    var samples = new Samples();
    
    return samples.getModel(params).then( () => samples );  

  }
}


module.exports = Samples;

