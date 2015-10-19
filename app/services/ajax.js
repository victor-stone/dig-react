'use strict';

import http from 'http';

function serverAjax(opts) {
  return new Promise( function(reject, resolve) {
    if( opts.method == 'GET') {
      http.get(opts.url, function(res) {
        if( opts.dataType == 'json') {
          resolve(res.headers['x-json']);
        } else {
          reject('only JSON supported for now');
        }
      }).on('error', reject );
    } else {
      reject('only GET supported for now');
    }
  });
}

function clientAjax(opts) {
  return $.ajax(opts);
}

module.exports = (global.IS_SERVER_REQUEST ? serverAjax : clientAjax);
