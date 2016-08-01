var API = {};


if( global.IS_SERVER_REQUEST ) {

var jsonrpc = require('jsonrpc-node');
var rsvp = require('rsvp');
var env = require('./env');

var client = new jsonrpc.HTTP.Client( env.rpcport || 80, env.apihost || 'ccm', null );

client.path = env.rpcpath || '/api';

var buildPromise = method => {
  return function (params,callback){
    client.call(method,params,callback);
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

client.call( 'rpc.listMethods', [], function(err, results) {
  if( err ) {
    throw new Error('rpc: ' + err);
  } else {
    initializeClient(results);
  }
});

API.initRPC = new rsvp.Promise( initializeClient );

}

module.exports = API;