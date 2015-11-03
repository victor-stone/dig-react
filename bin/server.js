'use strict';

global.IS_SERVER_REQUEST = true;
process.env.NODE_ENV = 'production';

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

class Server {
  constructor( router, distDir, AppModule, logPrefix, pathToIndex, bodyRegex ) {
    appLog = new LogWriter( logPrefix + '-app', 'logs');
    sysLog = new LogWriter( logPrefix + '-sys', 'logs');
    this.distDir = distDir;

    this.serverHook = new ServerHook( sysLog, appLog );
    this.serverHook.installHook( argv.sr || null );

    this.staticRouter = new StaticRouter();
    
    this.reactServer  = new ReactServer( router, AppModule, pathToIndex, bodyRegex );

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
        sysLog.logRequest(req,res)
      } else {
        this.reactServer.resolve( req.url, res, function(url, exception) {
            console.log('error during route:', url, exception);
            res.statusCode = 404;
            res.end(exception.message || 'Internal server doodah');
            sysLog.write( { url, 
                            exception: exception + '', 
                            stack: exception.stack || 'no stack available'} );
          }, function( url ) {
            if( url && res.statusCode !== 404 ) {
              appLog.logRequest(req,res);
            }
          });
      } 
      
    } else {
      console.log( 'status: ', res.statusCode);
      if( res.statusCode == 200 ) {
        res.statusCode = 500;
        res.end('Server error');
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

function handleReactError(url, exception ) {
  console.log('error handling:', url, exception);
  sysLog( { url, exception } );
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
