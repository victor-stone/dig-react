import Collection from './collection';
import ccmixter   from '../models/ccmixter';
import serialize  from '../models/serialize';


class Remixes extends Collection 
{
  fetch(queryParams,batchName) {
    return this.query(queryParams,batchName).then( serialize(ccmixter.Upload.Upload) );
  }

  static fromQuery( params ) {

    var pl = new Remixes();
    
    return pl.getModel(params).then( () => pl );  

  }
}

module.exports = Remixes;
