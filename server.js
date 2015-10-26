
// node --expose-gc server -mem

global.IS_SERVER_REQUEST = true;
process.env.NODE_ENV = 'production';

var http = require('http');
var fs   = require('fs');
var glob = require('glob');
var url  = require('url');
var argv = require('minimist')(process.argv.slice(2));

var DIST_DIR = './dist';
var port     = argv.port || 3000;

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
      log( 'sending file: ' + fname + ' (' + mime + ')' );
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

  if( argv.mem ) {
    manageMemory();
  }

  var file = url.parse(req.url,true).pathname;
  
  if( staticIncludes.includes( 'dist' + file ) ) {
    sendFile( res, file );
  } else {
    handleReactRoute( req.url, res );
  } 
}

var hitCount = 0;
var MAX_MEMORY_LIMIT = 150 * (1024*1024);

function manageMemory() {
  var heapUsed = process.memoryUsage().heapUsed;
  console.log( 'memoryUsage: ' + Math.floor((heapUsed / (1024*1024))) + 'MB' );
  if( ++hitCount % 20 === 0 || heapUsed > MAX_MEMORY_LIMIT ) {
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

            var bodyHTML =  renderToString( AppFactory(props) );

            log( 'sending routed url: ' + url );
            res.setHeader( 'Content-Type', 'text/html' );
            res.end(data.replace(/(<div\s+id="content">)([^<]+)?(<\/div>)/,'$1' + bodyHTML + '$3'));
          }

        });

    }).catch( handleError );
  }
}
