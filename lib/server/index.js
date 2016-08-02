'use strict';
/* eslint no-console:"off" */
/* eslint no-magic-numbers:"off" */
/* eslint quotes:"off" */

//process.env.NODE_ENV = 'production';

require('unicorns/lib-array');

var http    = require('http');
var cluster = require('cluster');
var url     = require('url');
var util    = require('util');
var argv    = require('minimist')(process.argv.slice(2));

var LogWriter     = require('./log-writer');
var ServerHook    = require('./server-hook');
var StaticRouter  = require('./static-router');
var ReactServer   = require('./react-server-router');

console.log( 'Server invoked with: ', argv );

var appLog = null;
var sysLog = null;

var port   = argv.port || 3000;
var logv   = (argv.log && argv.log.split(/,/)) || [];

global.verbose = argv.v;

const USE_CLUSTERS = argv.c || false;

function log() {
  if( global.verbose ) {
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
    this.serverHook   = new ServerHook( sysLog, appLog );
    this.staticRouter = new StaticRouter();    
  }

  start() {
    this.staticRouter.install( this.distDir, this.startServer.bind(this) );
  }

  startServer() {
    console.log('in start server');
    if (USE_CLUSTERS && cluster.isMaster) {
      var numWorkers = require('os').cpus().length;
      console.log("Master cluster is setting up " + numWorkers + "workers...");

      for (var i=0; i<numWorkers; i++) {
        cluster.fork();
      }

      cluster.on("online", function(worker) {
        log("Worker" + worker.process.pid + " is online");
      });

      cluster.on("exit", function(worker, code, signal) {
        log("Worker " + worker.process.pid + "exited with code: " + code + " and signal: " + signal);
        log("Starting a new worker");
        cluster.fork();
      });
    } else {
        this._startServer();
    }
  }

  _startServer() {
    http.createServer(this.handleRequest.bind(this)).listen(port);
    console.log('listening on port ' + port);
  }

  handleRequest( req, res ) {

    req.ip = req.ip || getIP(req);

    if( this.serverHook.validateRequest(req,res) ) {

      var file = url.parse(req.url,true).pathname;
      
      if( this.staticRouter.resolve( this.distDir + file, res ) ) {
        if( logv.indexOf('statics') !== -1 ) {
          sysLog.logRequest(req,res);
        }
      } else {
        this.reactServer.resolve( req.url, req, res, reactError, reactSuccess );
      } 
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
  return '?ip?';
}

function reactError(url,req,res,exception) {
  log( 'react router rejected ', url );
  res.statusCode = 404;
  res.end('not found');
  if( exception ) {
    console.log( exception, url, exception.stack );
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
  console.log(err, err.stack.split('\n'));
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
