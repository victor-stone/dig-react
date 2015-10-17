'use strict';

var http = require('http');

function serverAjax(url) {
  return new Promise( function(reject, resolve) {
    http.get(url, function(res) {
      resolve(res.headers['x-json']);
    }).on('error', reject );
  });
}

function clientAjax(url) {
  return $.ajax({url: url});
}

module.exports = (global.IS_SERVER_REQUEST ? serverAjax : clientAjax);
