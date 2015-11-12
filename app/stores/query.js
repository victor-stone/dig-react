'use strict';

import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import Eventer          from '../services/eventer';
import queryAjaxAdapter from '../services/query-ajax-adapter';

class Query extends Eventer
{
  constructor() {
    super(...arguments);
    this.adapter = queryAjaxAdapter;
    this._events = new Eventer();
  }

  query(params) {
    return this.adapter.query(params);
  }
  
  queryOne(params) {
    return this.adapter.queryOne(params);
  }
  
  findUser(id) {
    var qparams = {
      u: id,
      dataview: 'user_basic',
      f: 'json'
    };
    return this.queryOne(qparams).then( serialize( ccmixter.User ) );
  }

  searchUsers(params) {
    params.dataview ='user_basic';
    params.f = 'json';
    return this.query(params).then( serialize( ccmixter.UserBasic ) );
  }
  
  count(qparams) {
    var countParams = this.countParams(qparams);
    return this.queryOne(countParams);
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
}

module.exports = Query;
