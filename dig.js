
var Server = require('./bin/server');
var router = require('./built/services/router');
var dig    = require('./built/dig.js');

var bodyRegex =/(<div\s+id="content">)([^<]+)?(<\/div>)/;

var DIST_DIR = './dist';

var server = new Server( router, 
                         DIST_DIR, 
                         dig, 
                         'dig', 
                         DIST_DIR + '/dig.html', 
                         bodyRegex );

server.start();

