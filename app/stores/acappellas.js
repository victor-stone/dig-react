import Uploads          from './uploads';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import TotalsCache      from './totals';

const PELL_FILTERS      = [ 'featured', 'spoken_word', 'melody', 'rap' ];

var totals = new TotalsCache(PELL_FILTERS);

class ACappellas extends Uploads {

  constructor() {
    super(...arguments);
    this.totalsCache = totals;
  }

  fetch(queryParams,deferName) {
    queryParams.dataview = 'default'; // links_by doesn't have bpm
    return this.query(queryParams,deferName).then( serialize( ccmixter.ACappella ) );
  }

}

ACappellas.storeFromQuery = function(params,defaults) {
  var pells = new ACappellas(defaults);
  return pells.getModel(params).then( () => pells );  
};

module.exports = ACappellas;

