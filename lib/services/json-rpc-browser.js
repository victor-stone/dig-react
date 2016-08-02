
import jsonrpcphp from './jsonRPC2php.client.js';
import rsvp       from 'rsvp';
import env        from 'services/env';

var API = { _platform: 'browser' };

var rpc;

if( !global.IS_SERVER_REQUEST ) {
  var initializeRPC = ( resolve, reject ) => {
    try {
      var url = 'http://' + env.rpcHost + env.rpcPath;
      rpc  = new jsonrpcphp(url, () => resolve(rpc), { targetAPIObj: API } );
    } catch(e) {
      reject(e);
    }
  };

  API.initRPC = () => new rsvp.Promise( initializeRPC );
}

module.exports = API;