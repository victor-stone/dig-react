'use strict';

/** QueryAjaxAdapter **/

var ajax        = require('../services/ajax');
var querystring = require('querystring');

var queryHost ='http://ccmixter.org/api/query?';
  
var QueryAjaxAdapter = function() {
  this.ajax = ajax;
};

QueryAjaxAdapter.prototype._query = function(qString,isSingleton) {
  
    var url = queryHost + qString;

    var opts = {
      url: url,
      dataType: 'json',
      method: 'GET',
      cache: false
    };

    function _success(r) {
      if( isSingleton ) {
        r = r[0];
      }
      return r;
    }

    function _error(r, status, err) {
      if( r.responseText && r.responseText.match(/^<pre>/) ) {
        //something went south at ccMixter and there's a mysql error.
        console.error(r.responseText);
      }  else if( status && err ) {
        console.error(url, status, err.toString());
        throw err;
      }
      return isSingleton ? 0 : [ ];
    }

    return this.ajax(opts).then( _success, _error );
};

QueryAjaxAdapter.prototype.query = function(params) {
  return this._query(querystring.stringify(params),false);
};
  
QueryAjaxAdapter.prototype.queryOne = function(params) {
  return this._query(querystring.stringify(params),true);
};
  
/** Query **/

var Class     = require('../unicorns/class');
var ccmixter  = require('../models/ccmixter');
var serialize = require('../models/serialize');

var Query = Class.extend({

  init: function(adapter) {
    this.adapter = adapter || new QueryAjaxAdapter();
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
});

var QuerySingleton = new Query();

var QueryMixin = {
  componentWillMount: function() {
    this.query = QuerySingleton;
  }
};

var React = require('react');
var rsvp = require('rsvp');

const free = React.createClass({

  mixins: [QueryMixin],

  getPlaylist: function() {
    var params = { lic: 'open', limit: 10  };
    var modelRequest = {
      playlist: this.query.playlist( params ),
      total: this.query.count( params ),
    };
    rsvp.hash( modelRequest ).then( model => this.setState( { model }));
  },

  getInitialState: function() {
    return { model: { playlist: [], total: 0 } };
  },

  componentDidMount: function() {
    this.getPlaylist();
  },

  render() {
    return (
      <div className="playlist">
        <h1>Free stuff</h1>
        <Playlist model={this.state.model} />
      </div>
    );      
  },

});

var Playlist = React.createClass({
  render: function() {
    var playlistItems = this.props.model.playlist.map(function(upload, index) {
      return (
        <li key={index}>
          {upload.name} {upload.artist.name}
        </li>
      );
    });
    return (
      <ul className="uploadList">
        {playlistItems}
      </ul>
    );
  }
});

module.exports = free;

