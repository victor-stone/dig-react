/* eslint no-console:"off" */
import rsvp from 'rsvp';

var API = { _platform: 'server' };

if( global.IS_SERVER_REQUEST ) {

  var getMethodList = ( resolve /*, reject */) => {

    var jsonrpc = require('jsonrpc-node');
    var env = require('services/env');

    var buildPromise = method => {
      return function (...params){
        return new rsvp.Promise( function( resolve, reject ) {
          client.call( method, params, function(err,results) {
            if( err ) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      };
    };

    var initializeClient = apis => {
      for( var name in apis ) {
        var component = {};
        apis[name].forEach( methodName => component[methodName] = buildPromise(name + '.' + methodName) );
        API[name] = component;
      }
      return API;
    };

    var client = new jsonrpc.HTTP.Client( env.rpcPort, env.rpcHost, null );

    API.client = client;

    client.path = env.rpcPath;

    client.call( 'rpc.listMethods', [], function(err, results) {
      if( err ) {
        resolve(err);
      } else {
        initializeClient(results);
        resolve(null,API);
      }
    });
  };

  /*
    Note that this takes a callback, whereas the client version
    returns a promise. That's just how this thing played out
    for now.
  */
  API.initRPC = (cb) => getMethodList(cb);
}

module.exports = API;

//
