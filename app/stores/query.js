'use strict';

import Class from '../unicorns/class';
import ccmixter from '../models/ccmixter';
import serialize from '../models/serialize';
import rsvp from 'rsvp';

// this is a singleton
import { service as queryAjaxAdapter } from '../services/queryAjaxAdapter';

var Query = Class.extend({

  init: function(adapter) {
    this.adapter = adapter || queryAjaxAdapter;
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

  playlist: function(params) {
    params.dataview = 'links_by';
    params.f = 'json';
    return this.query(params).then( serialize(ccmixter.Upload) );
  },

  playlistWithCount: function(params) {
    var modelRequest = {
      playlist: this.playlist( params ),
      total: this.count( params ),
    };
    return rsvp.hash( modelRequest );
  },

});

// singleton
Query.service = new Query();

module.exports = Query;
