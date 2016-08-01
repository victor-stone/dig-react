var API = {};


import jsonrpcphp from './jsonRPC2php.client.js';
import rsvp       from 'rsvp';

var rpc;

if( !global.IS_SERVER_REQUEST ) {
  var initializeRPC = ( resolve, reject ) => {
    try {
      rpc  = new jsonrpcphp('http://ccm/api', () => resolve(rpc), { targetAPIObj: API } );
    } catch(e) {
      reject(e);
    }
  };

  API.initRPC = new rsvp.Promise( initializeRPC );
}

module.exports = API;