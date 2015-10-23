import Class from '../unicorns/class';
import ccmixter from '../models/ccmixter';
import serialize from '../models/serialize';

import { EventEmitter } from 'events';

// this is a singleton
import { service as queryAjaxAdapter } from '../services/queryAjaxAdapter';

var Query = Class.extend({

  init: function(adapter) {
    this.adapter = adapter || queryAjaxAdapter;
    this._events = new EventEmitter();
  },

  on: function(name,cb) {
    this._events.on(name,cb);
  },

  emit: function() {
    this._events.emit.apply(this._events,arguments);
  },

  removeListener: function(name,cb) {
    this._events.removeListener(name,cb);
  },

  query: function(params) {
    return this.adapter.query(params);
  },
  
  queryOne: function(params) {
    return this.adapter.queryOne(params);
  },
  
  findUser: function(id) {
    var qparams = {
      u: id,
      dataview: 'user_basic',
      f: 'json'
    };
    return this.queryOne(qparams).then( serialize( ccmixter.User ) );
  },

  searchUsers: function(params) {
    params.dataview ='user_basic';
    params.f = 'json';
    return this.query(params).then( serialize( ccmixter.UserBasic ) );
  },
  
  count: function(qparams) {
    var countParams = { f: 'count' };
    var exclude = [ 'limit', 'digrank', 'sort', 'ord', 'f', 'format'];
    for( var k in qparams ) {
      if( !exclude.contains(k) ) {
        countParams[k] = qparams[k];
      }
    }
    return this.queryOne(countParams);
  },

});

// singleton
Query.service = new Query();

module.exports = Query;
