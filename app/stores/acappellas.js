import Collection       from './collection';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import TotalsCache      from './lib/totals-cache';

const PELL_FILTERS = [ 'featured', 'spoken_word', 'melody', 'rap' ];

var totals = new TotalsCache(PELL_FILTERS);

class ACappellas extends Collection 
{
  constructor() {
    super(...arguments);
    this.totalsCache = totals;
  }

  fetch(queryParams,deferName) {
    
    queryParams.dataview = 'default'; // links_by doesn't have bpm
    
    return this.query(queryParams,deferName).then( serialize( ccmixter.Upload.ACappella ) );
  }

  static fromQuery(params) {

    var pells = new ACappellas();
    
    return pells.getModel(params).then( () => pells );  

  }
}

module.exports = ACappellas;

