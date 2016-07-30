import rsvp             from 'rsvp';
import Eventer          from '../services/eventer';
import queryAjaxAdapter from '../services/query-ajax-adapter';
import { LibArray }     from '../unicorns';

class Query extends Eventer
{
  constructor() {
    super(...arguments);
    this.adapter = queryAjaxAdapter;
    this.defers = new Map();
  }

  query(params, deferName) {
    if( deferName ) {
      const defer = rsvp.defer();
      defer.params = this._clean(params);
      this.defers.set(deferName,defer);
      return defer.promise;

    }
    return this.adapter.query(this._clean(params));
  }
  
  queryOne(params,deferName) {
    return this.query(params,deferName).then( r => r[0] );
  }
  
  refresh() {
    // define in derivations
  }  
  
  flushDefers(hash) {
    const h = {};
    const keys = Object.keys(hash);
    keys.forEach( k => {
      const promise = hash[k];
      if( promise && this.defers.has(k) ) {
        h[k] = this.defers.get(k).params;
      }
    });
    return this.adapter.hash(h).then( results => {      
      keys.forEach( k => {
        const promise = hash[k];
        if( promise && this.defers.has(k) ) {
          this.defers.get(k).resolve(results[k]);
          this.defers.delete(k);
        }
      });
      return rsvp.hash(hash);
    });
  }

  count(qparams,deferName) {
    return this.queryOne(this.countParams(qparams),deferName);
  }

  countParams(qparams) {
    const countParams = { f: 'count' };
    const exclude = LibArray.from([ 'limit', 'digrank', 'sort', 'ord', 'f', 'format' ]);
    for( var k in qparams ) {
      !exclude.contains(k) && qparams[k] && (countParams[k] = qparams[k]);
    }
    return countParams;    
  }

  _clean(p) {
    !('f' in p) && !('format' in p) && (p.f = 'jsex');
    const t = {};
    for( const k in p ) {
      const { [k]: val = null } = p;
      const { length = 1 } = val || '';
      val !== null && length && (t[k] = p[k]);
    }
    return t;
  }

}

module.exports = Query;
