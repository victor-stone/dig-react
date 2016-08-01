
import server from './json-rpc-server';
import client from './json-rpc-browser';

module.exports = global.IS_SERVER_REQUEST ? server : client;