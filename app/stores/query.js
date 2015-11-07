'use strict';

import ccmixter  from '../models/ccmixter';
import serialize from '../models/serialize';

import { EventEmitter } from 'events';

// this is a singleton
import { service as queryAjaxAdapter } from '../services/query-ajax-adapter';

class Query 
{
  constructor() {
    this.adapter = queryAjaxAdapter;
    this._events = new EventEmitter();
  }

  on(name,cb) {
    this._events.on(name,cb);
  }

  emit() {
    this._events.emit.apply(this._events,arguments);
  }

  removeListener(name,cb) {
    this._events.removeListener(name,cb);
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
}

// singleton
Query.service = new Query();

module.exports = Query;
