'use strict';

  
import Query from '../stores/query';
import rsvp from 'rsvp';

var QuerySingleton = new Query();

var QueryMixin = {

  componentWillMount: function() {
    this.query = QuerySingleton;
  },

  getInitialState: function() {
    return { model: { playlist: [], total: 0 } };
  },

  getPlaylist: function(params) {
    var modelRequest = {
      playlist: this.query.playlist( params ),
      total: this.query.count( params ),
    };
    rsvp.hash( modelRequest ).then( model => this.setState( { model }));
  },
};

module.exports = QueryMixin;

