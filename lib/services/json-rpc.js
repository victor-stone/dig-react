
module.exports = global.IS_SERVER_REQUEST ? require('services/json-rpc-server') : require('services/json-rpc-browser' ); 

