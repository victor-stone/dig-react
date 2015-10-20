
// node --expose-gc server 

if( typeof Array.prototype.includes === 'undefined' ) {
  Array.prototype.includes = function(v) { return this.indexOf(v) !== -1; }
}

global.IS_SERVER_REQUEST = true;

var DIST_DIR = './dist';
var port     = 3000;

var http = require('http');
var fs   = require('fs');
var glob = require('glob');
var url  = require('url');

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
];

var staticIncludes = [];

glob('dist/**/*.*',function(e,f) { 
  staticIncludes = f;
  http.createServer(handleRequest).listen(port);
  console.log('listening on port ' + port);
});

function sendFile(res,fileName) {
  var fname = DIST_DIR + fileName;
  fs.readFile(fname, function (err, data) {
    if (err) {
      console.log( 'Error ******', err );
      res.statusCode = 404;
      res.end('Not Found');
    } else {
      var mime = sniffMime(fileName);
      console.log( 'sending file: ' + fname + ' (' + mime + ')' );
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
  var urn = req.url === '/' ? '/index.html' : req.url;
  var parts = url.parse(urn,true);
  
  if( staticIncludes.includes( 'dist' + parts.pathname ) ) {
    sendFile( res, parts.pathname );
  } else {
    handleReactRoute(req.url,res);
  } 
}

//var hitCount = 0;
//var MAX_MEMORY_LIMIT = 50 * (1024*1024);

function manageMemory() {
  var heapUsed = process.memoryUsage().heapUsed;
  console.log( 'memoryUsage: ' + Math.floor((heapUsed / (1024*1024))) + 'MB' );
  /*
  if( ++hitCount % 20 === 0 || heapUsed > MAX_MEMORY_LIMIT ) {
    global.gc();
  } 
  */ 
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

var log = console.log;

function handleReactRoute(url,res) {
  
  log( 'trying to route: ', url );

  var handlers = router.resolve(url);

  if( !handlers ) {
    res.statusCode = 404;
    res.end('Not Found');
  } else {

    var handler = handlers[0];

    handler.component.model(handler.params, handler.queryParams).then(function (model) {
    
        var props = {
          name:        handler.component.displayName,
          component:   handler.component,
          model:       model,
          params:      handler.params,
          queryParams: handler.queryParams 
        };

        var bodyHTML = '<div id="content">' + renderToString( AppFactory(props) ) + '</div>';

        var fname = DIST_DIR + '/index.html';
        fs.readFile(fname, 'utf8', function (err, data) {
          if (err) {
            console.log( 'Error ******', err );
            res.statusCode = 500;
            res.end('Not Good');
          } else {
            console.log( 'sending routed url: ' + url );
            res.setHeader( 'Content-Type', 'text/html' );
            res.end(data.replace(/<div\s+id="content">.*<\/div>/,bodyHTML));
          }
        });

    }).catch( handleError );
  }
}
