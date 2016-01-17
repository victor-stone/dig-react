import Uploads     from './uploads';
import ccmixter    from '../models/ccmixter';
import serialize   from '../models/serialize';


class Remixes extends Uploads {

  fetch(queryParams,deferName) {
    return this.query(queryParams,deferName).then( serialize(ccmixter.Upload) );
  }

}

// performs the query but returns the store
// from the promise (which contains the result
// of the query in the .model property )
//
// very handy for routing
//
Remixes.storeFromQuery = function(params,defaults) {
  var pl = new Remixes(defaults);
  return pl.getModel(params).then( () => pl );  
};

module.exports = Remixes;
