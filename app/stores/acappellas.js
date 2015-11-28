import UploadList       from './upload-list';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import rsvp             from 'rsvp';

var MAX_CACHE_KEYS = 50;

class TotalsCache {
  constructor() {
    this._totals     = {};
    this._keys_count = 0;    
    this._filters    = [ 'featured', 'spoken_word', 'melody', 'rap' ];
    this._skip       = [ 'offset', 'limit', 'dataview', 'reqtags', '_', 'f' ];

  }

  getTotals(params,store) {

    var p = {};
    Object.keys(params).sort().forEach( k => {
      if( !this._skip.contains(k) && params[k] ) {
        p[k] = params[k];
      }
    });

    var paramsKey = JSON.stringify(p);

    if( paramsKey in this._totals ) {
      return rsvp.resolve(this._totals[paramsKey]);
    }

    p.reqtags = 'acappella';

    var counts = { 
        all: store.count(p),
      };

    this._filters.forEach( f => {
      p.reqtags = 'acappella,' + f;
      counts[f] = store.count(p);
    });

    return rsvp.hash(counts)
            .then( r => {
              if( this._keys_count++ > MAX_CACHE_KEYS ) {
                this._keys_count = 0;
                this._totals = { };
              }
              ++this._keys_count;
              this._totals[ paramsKey ] = r;
              return r;
            });
  }
}

TotalsCache._service = null;

TotalsCache.getTotals = function(params,store) {
  if( !TotalsCache._service ) {
    TotalsCache._service = new TotalsCache();
  }
  return TotalsCache._service.getTotals(params,store);
};

class ACappellas extends UploadList {

  fetch(queryParams) {
    queryParams.dataview = 'default'; // links_by doesn't have bpm
    return this.query(queryParams).then( serialize( ccmixter.ACappella ) );
  }

  promiseHash( hash, queryParams ) {
    hash.totals = TotalsCache.getTotals(queryParams,this);
    return hash;
  }

}

ACappellas.storeFromQuery = function(params,defaults) {
  var pells = new ACappellas(defaults);
  return pells.getModel(params).then( () => pells );  
};

module.exports = ACappellas;

