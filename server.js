'use strict';

global.IS_SERVER_REQUEST = true;
process.env.NODE_ENV = 'production';

var http = require('http');
var fs   = require('fs');
var glob = require('glob');
var url  = require('url');
var util = require('util');
var argv = require('minimist')(process.argv.slice(2));

var LogWriter = require('./log');

console.log( 'Server invoked with: ', argv )

var DIST_DIR = './dist';
var port     = argv.port || 3000;

var appLog = new LogWriter('app', 'logs');
var sysLog = new LogWriter('sys', 'logs');

var log  = function() {
  if( argv.v ) {
    console.log.apply(console.log,arguments);
  }
}

var matches = [
  [ new RegExp('\.js$'),    'text/javascript'],
  [ new RegExp('\.css$'),   'text/css'],
  [ new RegExp('\.html$'),  'text/html' ],
  [ new RegExp('\.png$'),   'image/png' ],
  [ new RegExp('\.eot$'),   'application/vnd.ms-fontobject eot' ],
  [ new RegExp('\.otf$'),   'font/opentype otf' ],
  [ new RegExp('\.ttf$'),   'font/truetype ttf' ],
  [ new RegExp('\.woff2?$'),'font/woff2' ],
  [ new RegExp('\.svg$'),   'image/svg+xml' ],
  [ new RegExp('\.map$'),   'application/octet-stream' ],
  [ new RegExp('\.jpe?g$'), 'image/jpeg'],
  [ new RegExp('\.ico$'),   'image/x-icon'],
];

var staticIncludes = [];

function sendFile(res,fileName) {
  var fname = DIST_DIR + fileName;
  fs.readFile(fname, function (err, data) {
    if (err) {
      console.log( 'Error ******', err );
      res.statusCode = 404;
      res.end('Not Found');
    } else {
      var mime = sniffMime(fileName);
      //log( 'sending file: ' + fname + ' (' + mime + ')' );
      res.setHeader( 'Content-Type', mime );
      res.end(data);
    }
  });
}

function sniffMime(fname) {
  for( var i = 0; i < matches.length; i++ ) {
    if( fname.match(matches[i][0]) ) {
      return matches[i][1];
    }
  }
}

function handleRequest( req, res ) {

  var ip = getIP(req);

  if( argv.mem ) {
    manageMemory();
  }

  if( validateRequest(req,res) ) {
    var file = url.parse(req.url,true).pathname;
    
    if( staticIncludes.includes( 'dist' + file ) ) {
      sendFile( res, file );
      sysLog.logRequest(ip,req,res)
    } else {
      handleReactRoute( req.url, res );
      appLog.logRequest(ip,req,res);
    } 
  } else {
    res.statusCode = 500;
    res.end('Server error');
    sysLog.logRequest(ip,req,res)
  }
}

function getIP(req) {
  if( 'x-forwaded-for' in req.headers ) {
    return req.headers['x-forwaded-for']; // .split(',')[0].replace(/[A-Za-z:\s-]/g,'');
  }
  if( req.connection.remoteAddress ) {
    return req.connection.remoteAddress.replace(/(ffff|:)/g,'');
  }
  return '?ip?'
}


/* memory handling */

var hitCount = 0;
var MAX_MEMORY_LIMIT = 150 * (1024*1024);
var MAX_NON_GC_ALLOC = 200;

function manageMemory() {
  var heapUsed = process.memoryUsage().heapUsed;
  console.log( 'memoryUsage: ' + Math.floor((heapUsed / (1024*1024))) + 'MB' );
  if( ++hitCount % MAX_NON_GC_ALLOC === 0 || heapUsed > MAX_MEMORY_LIMIT ) {
    console.log( "------> Doing GC");
    global.gc();
  } 
}

function handleError(err) {
  console.log(err);
}

/* react routing */

var renderToString  = require('react-dom/server').renderToStaticMarkup;
var React           = require('react');
var router          = require('./built/services/router');

var App        = require('./built/app.js');
var AppFactory = React.createFactory(App);

function handleReactRoute(url,res) {
  
  log( 'trying to route: ', url );

  var handlers = router.resolve(url);

  if( !handlers ) {
    
    console.log( '404:', url );
    res.statusCode = 404;
    res.end('Not Found');

  } else {

    var h = handlers[0];

    h.component.store(h.params, h.queryParams)

      .then(function (store) {
    
        var fname = DIST_DIR + '/index.html';

        fs.readFile(fname, 'utf8', function (err, data) {
          if (err) {

            console.log( 'Error ******', err );
            res.statusCode = 500;
            res.end('Not Good');

          } else {

            var props = {
              name:        h.component.displayName,
              component:   h.component,
              store:       store,
              params:      h.params,
              queryParams: h.queryParams 
            };

            var bodyHTML = renderToString( AppFactory(props) );
            var html     = data.replace(/(<div\s+id="content">)([^<]+)?(<\/div>)/,'$1' + bodyHTML + '$3'); 

            if( h.component.title ) {
              html = html.replace( /<title>[^<]+<\/title>/, '<title>' + h.component.title + '</title>');
            }

            log( 'sending routed url: ' + url );
            res.setHeader( 'Content-Type', 'text/html' );
            res.end(html);
          }

        });

    }).catch( handleError );
  }
}

/* Server request validation */

var serverRulesTimestamp = 0;
var serverRules          = null;
var ServerRulesModule    = argv.sr;
var serverRulesAreBroken = false;

function _getServerRules() {
  serverRulesTimestamp = fs.statSync(ServerRulesModule).mtime.getTime();
  var code = fs.readFileSync(ServerRulesModule,'utf8');
  sysLog.write( 'Loading Server Rules Code');
  try {
    var _serverRules = null;
    eval(code);
    serverRules = _serverRules;
    serverRulesAreBroken = false;
  } catch(e) {
    console.log( 'SERVER RULE  PARSE ERROR: ', e.message );
    serverRulesAreBroken = true;
  }
}

function validateRequest( req, res ) {
  var result = true;

  if( ServerRulesModule && fs.existsSync(ServerRulesModule) ) {
    if( !serverRules && !serverRulesAreBroken ) {
      _getServerRules();
    } else {
      var currRulesTimestamp = fs.statSync(ServerRulesModule).mtime.getTime();
      if( currRulesTimestamp > serverRulesTimestamp ) {
        _getServerRules();
      }
    }
    try {
      if( !serverRulesAreBroken ) {
        var ip = getIP(req);
        result = serverRules({ req, res, sysLog, appLog, ip } );
      }
    } catch( e ) {
      console.log( 'SERVER RULE ERROR: ', e.message );
      serverRulesAreBroken = true;
      result = false;
    }
  }
  return result;
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
  sysLog.write( { exception: util.inspect(err) } );
});

process.on('unhandledRejection', function(reason, p) {
  // unhandled rejected promise
  sysLog.write( { reject: util.inspect(p), reason })  ;
});

glob('dist/**/*.*',function(e,f) { 
  staticIncludes = f;
  http.createServer(handleRequest).listen(port);
  console.log('listening on port ' + port);
});
