import querystring      from 'querystring';
import { EventEmitter } from 'events';
import util             from 'util';
import ajax             from './ajax';

var queryHost ='http://ccmixter.org/api/query?';
//var queryHost ='http://ccm/api/query?';
  
var QueryAjaxAdapter = function() {
  EventEmitter.call(this);
  this.ajax = ajax;
  this._loadingCount = 0;
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

QueryAjaxAdapter.prototype._inc = function() {
  if( !this._loadingCount ) {
    this.emit('loading', true );
  }
  ++this._loadingCount;
};

QueryAjaxAdapter.prototype._dec = function() {
  --this._loadingCount;
  if( !this._loadingCount ) {
    this.emit('loading', false );
  }
};

QueryAjaxAdapter.service = new QueryAjaxAdapter();

module.exports = QueryAjaxAdapter;
