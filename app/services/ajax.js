'use strict';

var rsvp = require('rsvp');

function serverAjax(opts) {
  var http = require('http');
  return new rsvp.Promise( function(resolve, reject) {
    if( opts.method == 'GET') {
      http.get(opts.url, function(res) {
        if( opts.dataType == 'json') {
          if( res.headers['x-json'] ) {
            resolve(JSON.parse(res.headers['x-json']));
          } else {
            var data = '';
            res.on('data', function (chunk) {
              data += chunk.toString();
            });
            res.on('end', function () {
              resolve(JSON.parse(data));
            });            
          }
        } else {
          reject('only JSON supported for now');
        }
      }).on('error', reject );
    } else {
      reject('only GET supported for now');
    }
  });
}

/* globals $ */
function clientAjax(opts) {
  return new rsvp.Promise( function(resolve,reject) {
      $.ajax(opts).done( resolve ).fail( reject );
  });
}

module.exports = (global.IS_SERVER_REQUEST ? serverAjax : clientAjax);
