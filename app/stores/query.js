import rsvp             from 'rsvp';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import Eventer          from '../services/eventer';
import queryAjaxAdapter from '../services/query-ajax-adapter';
import { oassign,
         mergeParams }  from '../unicorns';

class Query extends Eventer
{
  constructor() {
    super(...arguments);
    this.adapter = queryAjaxAdapter;
    this.defers = new Map();
  }

  query(params, deferName) {
    if( deferName ) {
      var defer = rsvp.defer();
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
    var h = {};
    var keys = Object.keys(hash);
    keys.forEach( k => {
      var promise = hash[k];
      if( promise && this.defers.has(k) ) {
        h[k] = this.defers.get(k).params;
      }
    });
    return this.adapter.hash(h).then( results => {      
      keys.forEach( k => {
        var promise = hash[k];
        if( promise && this.defers.has(k) ) {
          this.defers.get(k).resolve(results[k]);
          this.defers.delete(k);
        }
      });
      return rsvp.hash(hash);
    });
  }

  count(qparams,deferName) {
    var countParams = this.countParams(qparams);
    return this.queryOne(countParams,deferName);
  }

  countParams(qparams) {
    var countParams = { f: 'count' };
    var exclude = [ 'limit', 'digrank', 'sort', 'ord', 'f', 'format' ];
    for( var k in qparams ) {
      if( !exclude.contains(k) && qparams[k] ) {
        countParams[k] = qparams[k];
      }
    }
    return countParams;    
  }

  _clean(p) {
    if( !('f' in p) && !('format' in p) ) {
      p.f = 'jsex';
    }
    var t = {};
    for( var k in p ) {
      const { [k]: val = null } = p;
      const { length = 1 } = val || '';

      if( val !== null && length ) {
        t[k] = p[k];
      }
    }
    return t;
  }

  // yea, these should definitely be somewhere else
  findUser(id,deferName) {
    var qparams = {
      u: id,
      dataview: 'user_basic',
    };
    return this.queryOne(qparams,deferName).then( serialize( ccmixter.User ) );
  }

  findUsers(queryParams,deferName) {
    var qp = oassign( {
      t: 'user_list',
    }, queryParams );
    return this.query(qp,deferName).then( serialize( ccmixter.User ) );
  }

  // search the entire user record
  searchUsers(params,deferName) {
    params.dataview ='user_basic';
    return this.query(params,deferName).then( serialize( ccmixter.UserBasic ) );
  }

  // only look at the beginning of the user_name or user_real_name  
  lookUpUsers(str, queryParams,deferName) {
    var q = mergeParams( { lookup: str }, queryParams || {} );
    return this.searchUsers( q, deferName );
  }
  

}

module.exports = Query;
