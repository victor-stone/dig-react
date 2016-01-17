import Uploads          from './uploads';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import rsvp             from 'rsvp';
import { TagString }    from '../unicorns';

const MAX_CACHE_KEYS = 50;

const PELL_FILTERS      = [ 'featured', 'spoken_word', 'melody', 'rap' ];
const PELL_FILTER_REGEX = new RegExp('^(' + PELL_FILTERS.join('|') + ')$'); 

class TotalsCache {
  constructor() {
    this._totals     = {};
    this._keys_count = 0;    
    this._skip       = [ 'offset', 'limit', 'dataview', 'reqtags', '_', 'f' ];
  }

  getTotals(params,store) {

    var p = {};
    Object.keys(params).sort().forEach( k => {
      if( !this._skip.contains(k) && params[k] ) {
        p[k] = params[k];
      }
    });

    var reqtags = new TagString(params.reqtags);
    reqtags.remove( reqtags.filter(PELL_FILTER_REGEX) );

    p.reqtags = reqtags.toString();

    var paramsKey = JSON.stringify(p);

    if( paramsKey in this._totals ) {
      return rsvp.resolve(this._totals[paramsKey]);
    }

    p.reqtags = reqtags.toString();

    var counts = { 
        all: store.count(p),
      };

    PELL_FILTERS.forEach( f => {
      p.reqtags = reqtags.add(f).toString();
      counts[f] = store.count(p,f);
      reqtags.remove(f);
    });

    return store.flushDefers(counts)
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

class ACappellas extends Uploads {

  getModel( queryParams ) {
    var tags   = new TagString(queryParams.reqtags);
    var filter = tags.filter( PELL_FILTER_REGEX );
    if( filter.getLength() > 0 ) {
      var tag = filter.toString();
      return TotalsCache.getTotals(queryParams,this).then( totals => {
        if( !totals[tag] ) {
          queryParams.reqtags = tags.remove(filter).toString();
        }
        return super.getModel(queryParams);
      });
    }
    return super.getModel(queryParams);
  }

  fetch(queryParams,deferName) {
    queryParams.dataview = 'default'; // links_by doesn't have bpm
    return this.query(queryParams,deferName).then( serialize( ccmixter.ACappella ) );
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

