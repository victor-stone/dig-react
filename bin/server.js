'use strict';

global.IS_SERVER_REQUEST = true;
//process.env.NODE_ENV = 'production';

var http = require('http');
var url  = require('url');
var util = require('util');
var argv = require('minimist')(process.argv.slice(2));

var LogWriter     = require('./log-writer');
var ServerHook    = require('./server-hook');
var StaticRouter  = require('./static-router');
var ReactServer   = require('./react-server-router');
var MemoryManager = require('./memory.js')

console.log( 'Server invoked with: ', argv )

var appLog = null;
var sysLog = null;

var port   = argv.port || 3000;

global.verbose = argv.v;

function log() {
  if( verbose ) {
    console.log.apply(console,arguments);
  }
}

class Server {
  constructor( router, distDir, AppModule, logPrefix, bodyRegex ) {
    appLog = new LogWriter( logPrefix + '-app', 'logs');
    sysLog = new LogWriter( logPrefix + '-sys', 'logs');
    
    this.distDir = distDir;

    var pathToIndex = distDir + '/index.html';

    bodyRegex = bodyRegex || /(<div\s+id="content">)([^<]+)?(<\/div>)/;

    this.reactServer  = new ReactServer( router, AppModule, pathToIndex, bodyRegex );

    this.serverHook = new ServerHook( sysLog, appLog );
    this.serverHook.installHook( argv.sr || null );

    this.staticRouter = new StaticRouter();
    
    var MAX_MEMORY_LIMIT = 150 * (1024*1024);
    var MAX_NON_GC_ALLOC = 200;
    this.memManager = new MemoryManager( argv.mem, MAX_MEMORY_LIMIT, MAX_NON_GC_ALLOC );

  }

  start() {
    this.staticRouter.install( this.distDir, this.startServer.bind(this) );
  }

  startServer() {
    http.createServer(this.handleRequest.bind(this)).listen(port);
    console.log('listening on port ' + port);
  }

  handleRequest( req, res ) {

    req.ip = req.ip || getIP(req);

    this.memManager.manage();

    if( this.serverHook.validateRequest(req,res) ) {

      var file = url.parse(req.url,true).pathname;
      
      if( this.staticRouter.resolve( this.distDir + file, res ) ) {
        log( 'static router took ', req.url );
        sysLog.logRequest(req,res)
      } else {
        this.reactServer.resolve( req.url, req, res, reactError, reactSuccess );
      } 
      
    } else {
      //console.log( 'status: ', res.statusCode);
      if( !res._handled ) {
        res.statusCode = 500;
        res.end('500 Server error');
      }
      sysLog.logRequest(req,res)
    }
  }
}

function getIP(req) {
  if( 'x-forwarded-for' in req.headers ) {
    return req.headers['x-forwarded-for'];
  }
  if( req.connection.remoteAddress ) {
    return req.connection.remoteAddress.replace(/(ffff|:)/g,'');
  }
  return '?ip?'
}

function reactError(url,req,res,exception) {
  log( 'react router rejected ', url );
  res.statusCode = 404;
  res.end('not found');
  if( exception ) {
    console.log( exception );
  }
  sysLog.logRequest(req,res,exception);
}

function reactSuccess ( url, req, res ) {
  if( res.statusCode === 200  ) {
    log( 'react router accepted ', url );
    appLog.logRequest(req,res);
  } else {
    log( 'react router weired out ', res.statusCode, url );
    sysLog.logRequest(req,res);
  }
}

process.on('SIGINT', function() {
  console.log("\n" + 'Got SIGINT. Exiting server.');
  try {
    sysLog.end();
    appLog.end();    
  } catch(e) {
    console.log( e );
  }
  process.exit(0);
});

process.on('uncaughtException', function(err) {
  console.log(err);
  if( sysLog ) {
    sysLog.write( { msg: 'uncaughtException', 
                    exception: err + '', 
                    stack: err.stack || 'no stack available' } );
  }
});

process.on('unhandledRejection', function(reason, p) {
  // unhandled rejected promise
  if( sysLog ) {
    sysLog.write( { reject: util.inspect(p), reason })  ;
  }
});

module.exports = Server;
