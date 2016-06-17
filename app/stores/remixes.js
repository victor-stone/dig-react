import QueryWithTags    from './query-with-tags';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';


class Remixes extends QueryWithTags {

  fetch(queryParams,deferName) {
    return this.query(queryParams,deferName).then( serialize(ccmixter.Upload) );
  }

}

Remixes.storeFromQuery = function(params,defaults) {
  var pl = new Remixes(defaults);
  return pl.getModel(params).then( () => pl );  
};

module.exports = Remixes;
