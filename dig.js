
var Server = require('./bin/server');
var router = require('./built/services/router');
var App    = require('./built/app.js');

var bodyRegex =/(<div\s+id="content">)([^<]+)?(<\/div>)/;

var DIST_DIR = './dist';

var server = new Server( router, DIST_DIR, App, 'dig', DIST_DIR + '/index.html', bodyRegex );

server.start();

