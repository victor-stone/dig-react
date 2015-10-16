
// node --expose-gc server 

if( typeof Array.prototype.includes === 'undefined' ) {
  Array.prototype.includes = function(v) { return this.indexOf(v) !== -1; }
}

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
];

var staticIncludes = [];

glob('dist/**/*.*',function(e,f) { 
  staticIncludes = f;
  console.log('listening on port ' + port);
  http.createServer(handleRequest).listen(port);
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
      res.setHeader( 'Content-Type', mime );
      console.log( 'sending file: ' + fname + ' (' + mime + ')' );
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
    console.log('404: ', req.url);
    res.statusCode = 404;
    return res.end('Not Found');
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



