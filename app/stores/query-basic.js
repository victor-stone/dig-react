import rsvp             from 'rsvp';

import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import events           from '../models/events';
import Eventer          from '../services/eventer';
import queryAjaxAdapter from '../services/query-ajax-adapter';
import { oassign,
         mergeParams }  from '../unicorns';

class Query extends Eventer
{
  constructor() {
    super(...arguments);
    this.adapter = queryAjaxAdapter;
    this.defers = {};
  }

  query(params, deferName) {
    if( deferName ) {
      var defer = rsvp.defer();
      defer.params = this._clean(params);
      this.defers[deferName] = defer;
      return defer.promise;

    }
    return this.adapter.query(this._clean(params));
  }
  
  queryOne(params,deferName) {
    return this.query(params,deferName).then( r => r[0] );
  }
  
  performAction( action ) {
    this.emit( events.ACTION_START, action.name );
    var resultHolder = null;
    return action
            .then( result => { 
                resultHolder = result;
                return this.refresh(result.queryParams || this.model.queryParams); 
            }).then( (info) => {
              this.emit( events.ACTION_END, action.name, info );
              return resultHolder;
            });
  }

  refresh() {
    // define in derivations
  }  
  
  flushDefers(hash) {
    var h = {};
    var keys = Object.keys(hash);
    keys.forEach( k => {
      var promise = hash[k];
      if( promise && k in this.defers ) {
        h[k] = this.defers[k].params;
      }
    });
    return this.adapter.hash(h).then( results => {      
      keys.forEach( k => {
        var promise = hash[k];
        if( promise && k in this.defers ) {
          this.defers[k].resolve(results[k]);
          delete this.defers[k];
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

  transaction(promise) {
    this.adapter._inc();
    return promise.finally( () => this.adapter._dec() );
  }

  _clean(p) {
    if( !('f' in p) && !('format' in p) ) {
      p.f = 'jsex';
    }
    var t = {};
    for( var k in p ) {
      if( !(typeof p[k] === 'undefined' || (typeof p[k] === 'string' && p[k].length === 0)) ) {
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
