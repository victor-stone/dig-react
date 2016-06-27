import TaggedCollection from './tagged-collection';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';


class Remixes extends TaggedCollection 
{
  fetch(queryParams,deferName) {
    return this.query(queryParams,deferName).then( serialize(ccmixter.Upload) );
  }
}

Remixes.storeFromQuery = function(params,defaults) {
  var pl = new Remixes(defaults);
  return pl.getModel(params).then( () => pl );  
};

module.exports = Remixes;
