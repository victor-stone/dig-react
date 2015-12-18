import rsvp from 'rsvp';

const MAX_ERROR_STR = 40;

function resolveWithJSON(resolve, reject, url, supposedJSON) {
  try {
    resolve(JSON.parse(supposedJSON));
  } catch( e ) {
    if( supposedJSON.charAt(0) === '<' ) {
      supposedJSON = supposedJSON.substr(0,MAX_ERROR_STR);                  
    }
    e.message = `Bad json from ${url}\n[${supposedJSON}...]\n${e.message}`;
    reject( e );
  }
}

function serverAjax(opts) {
  if( '_ccmClientOnly' in opts ) {
    return rsvp.resolve( [] );
  }
  var http = require('http');
  return new rsvp.Promise( function(resolve, reject) {
    if( opts.method === 'GET') {
      http.get(opts.url, function(res) {
        /* xeslint no-console:0 */
        //console.log( 'ajax response ',res.headers['x-json'] );
        if( opts.dataType === 'json') {
          if( res.headers['x-json'] ) {
            resolveWithJSON(resolve,reject,opts.url,res.headers['x-json']);
          } else {
            var data = '';
            res.on('data', function (chunk) {
              data += chunk.toString();
            });
            res.on('end', function () {
              resolveWithJSON(resolve,reject,opts.url,data);
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
    opts.success = function(data) {
      // breakout for debugging;
      resolve(data);
    };
    opts.error = function( jqXHR, textStatus, errorThrown ) {
      var err = errorThrown instanceof Error ? errorThrown : new Error(errorThrown || textStatus);
      reject(err);
    };
    $.ajax(opts);
  });
}

module.exports = (global.IS_SERVER_REQUEST ? serverAjax : clientAjax);
