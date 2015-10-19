'use strict';

/** QueryAjaxAdapter **/

import ajax from './ajax';
import querystring from 'querystring';

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

module.exports = QueryAjaxAdapter;
