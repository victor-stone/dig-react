import rsvp             from 'rsvp';
import Eventer          from 'services/eventer';
//import queryAjaxAdapter from '../services/query-ajax-adapter';
import { LibArray,
         quickLoop }     from 'unicorns';
import rpc              from 'services/json-rpc';

class Query extends Eventer
{
  constructor() {
    super(...arguments);
    this.defers = new Map();
  }

  query(params, batchName) {
    if( batchName ) {
      const defer = rsvp.defer();
      defer.params = this._clean(params);
      this.defers.set(batchName,defer);
      return defer.promise;
    }
    return rpc.query.q( params ).then( result => {
      if( 'noarray' in params && Array.isArray(result) ) {
        return result[0];
      }
      return result;
    });
  }
  
  refresh() {
    // define in derivations
  }  
  
  flushBatch(hash) {
    const h      = {};
    const defers = this.defers;      
    const keys   = Object.keys(hash);

    quickLoop( keys, k => ( hash[k] && defers.has(k) ) && (h[k] = defers.get(k).params) );

    return rpc.query.qs(h).then( results => {      

      quickLoop( keys, k => {
        if( hash[k] && defers.has(k) ) {
          var promise = defers.get(k);
          var result  = results[k];
          if( 'noarray' in promise.params && Array.isArray(result) ) {
            result = result[0];
          }
          promise.resolve(result);
          defers.delete(k);
        }
      });

      return rsvp.hash(hash);
    });
  }

  count(qparams,batchName) {
    return this.query(this.countParams(qparams),batchName);
  }

  countParams(qparams) {
    const countParams = { f: 'count', noarray: 1 };
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
