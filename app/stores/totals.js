import rsvp             from 'rsvp';
import { TagString }    from '../unicorns';

const MAX_CACHE_KEYS = 50;

class TotalsCache {
  constructor(reqtagFilters) {
    this._filters    = reqtagFilters;
    this._regex      = new RegExp('^(' + reqtagFilters.join('|') + ')$'); 
    this._totals     = {};
    this._keys_count = 0;    
    this._skip       = [ 'offset', 'limit', 'dataview', 'reqtags', '_', 'f' ];
  }

  filter(tags) {
      return tags.filter( this._regex );
  }

  getTotals(params,store) {

    var reqtagFilters = this._filters;
    var filter = this._regex;
    var p = {};
    Object.keys(params).sort().forEach( k => {
      if( !this._skip.contains(k) && params[k] ) {
        p[k] = params[k];
      }
    });

    var reqtags = new TagString(params.reqtags);
    reqtags.remove( reqtags.filter(filter) );

    p.reqtags = reqtags.toString();

    var paramsKey = JSON.stringify(p);

    if( paramsKey in this._totals ) {
      return rsvp.resolve(this._totals[paramsKey]);
    }

    p.reqtags = reqtags.toString();

    var counts = { 
        all: store.count(p),
      };

    reqtagFilters.forEach( f => {
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

module.exports = TotalsCache;

