import querystring      from 'querystring';
import { EventEmitter } from 'events';
import util             from 'util';
import ajax             from './ajax';
import { debounce }     from '../unicorns';

var queryHost ='http://ccmixter.org/api/query?';
//var queryHost ='http://ccm/api/query?';
  
var QueryAjaxAdapter = function() {
  EventEmitter.call(this);
  this.ajax = ajax;
  this._loading = false;
  this._transaction = false;

  var DEBOUNCE_START_LOADING = 50;
  var DEBOUNCE_STOP_LOADING  = 300;

  this._inc = debounce( function() {
      if( !this._transaction && !this._loading ) {
        this.emit('loading', true  );
        this._loading = true;
      }
    }.bind(this),  DEBOUNCE_START_LOADING );

  this._dec = debounce( function() {
      if( !this._transaction ) {
        this.emit('loading', false );
        this._loading = false;
      }
    }.bind(this), DEBOUNCE_STOP_LOADING );
};



util.inherits(QueryAjaxAdapter,EventEmitter);

QueryAjaxAdapter.prototype._query = function(qString,isSingleton) {
  
    var url = queryHost + qString;

    var opts = {
      url: url,
      dataType: 'json',
      method: 'GET',
      cache: false
    };

    var _this = this;

    function _success(r) {
      _this._dec();
      if( isSingleton ) {
        r = r[0];
      }
      return r;
    }

    function _error(r, status, err) {
      /*eslint no-console:0 */
      _this._dec();
      if( r.responseText && r.responseText.match(/^<pre>/) ) {
        //something went south at ccMixter and there's a mysql error.
        console.error(r.responseText);
      }  else if( status && err ) {
        console.error(url, status, err.toString());
        throw err;
      }
      return isSingleton ? 0 : [ ];
    }

    this._inc();
    return this.ajax(opts).then( _success, _error );
};

QueryAjaxAdapter.prototype.query = function(params) {
  return this._query(querystring.stringify(params),false);
};
  
QueryAjaxAdapter.prototype.queryOne = function(params) {
  return this._query(querystring.stringify(params),true);
};

QueryAjaxAdapter.prototype.transaction = function(startOrStop) {
  if( startOrStop ) {
    this._inc();
    this._transaction = true;
  } else {
    this._transaction = false;
    this._dec();
  }
};

var service = new QueryAjaxAdapter();

QueryAjaxAdapter.Transaction = function(promise) {
  service.transaction(true);
  return promise.finally( function() {
    service.transaction(false);
  });
};

QueryAjaxAdapter.service = service;

module.exports = QueryAjaxAdapter;
