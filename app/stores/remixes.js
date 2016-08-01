import Collection from './collection';
import ccmixter   from '../models/ccmixter';
import serialize  from '../models/serialize';


class Remixes extends Collection 
{
  fetch(queryParams,deferName) {
    return this.query(queryParams,deferName).then( serialize(ccmixter.Upload.Upload) );
  }

  static fromQuery( params ) {

    var pl = new Remixes();
    
    return pl.getModel(params).then( () => pl );  

  }
}

module.exports = Remixes;
