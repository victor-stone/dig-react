
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
    handleReactRoute(req.url);
    res.end();
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
var renderToString  = require('react-dom/server').renderToString;
var ReactRouter     = require('react-router');
var RoutingContext  = ReactRouter.RoutingContext;
var AppRoutes       = './app/routes';

function handleReactRoute(url) {
  ReactRouter.match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.send(500, error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.send(200, renderToString( React.createElement(RoutingContext,renderProps) ));
    } else {
      res.send(404, 'Not found');
    }
  });  
}

