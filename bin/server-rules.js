console.log('Importing Server Validation Rules ' + new Date());

var just_one = false;

var validationTests = [

  function(req,res) {
    var catchCrawler = req.url.match(/offset=([0-9]+)/);
    if( catchCrawler !== null ) {
        if( Number(catchCrawler[1]) > 30000 ) {
          res._handled = true;
          return false;
        }
    }
    return true;    
  },

  function(req,res) {
    var userAgent = req.headers['user-agent'];
    if( req.url.match(/^\/dig/) && userAgent.match(/\u0044\u0061\u006c\u0076/) ) {
      res._handled = true;
      return false;
    }
    return true;    
  }

];

function isValidRequest(req,res) {

  for( var i = 0; i < validationTests.length; i++ ) {
    if( !validationTests[i](req,res) ) {
      return false;
    }  
  }
  return true;
}

function google404s(req,res) {

  var url = req.url;

  if( url.match(/^\/files\/[^\/]*\/true$/) !== null || 
      url.match(/^\/people\/[0-9]+$/) !== null ||
      url.match(/^\/files\/[0-9]+\/[0-9]+$/) !== null ) {
    res.statusCode = 404;
    res._handled = true;
    res.end('404 Not found');
    return false;
  }

  return true;
}

function skipThese(req,res) {
  return req.url.match(/(.js|.css|.html|.png|.eot|.otf|.ttf|.woff|.woff2|woff2\?v\=4.4\.0|.svg|.jpg|.jpeg|.ico)$/) !== null;
}

module.exports = function(ctx) {

  var req = ctx.req;
  var res = ctx.res;

  if( skipThese(req,res) ) {
    return true;
  }

  if( !google404s(req,res) ) {
    return false;
  }

  if( !isValidRequest(req,res) ) {
    return false;
  }

  if( !just_one ) {
    // ctx.sysLog.write( { req: util.inspect(req) } );
    just_one = true;
  }

  return true;
};

function dumpCleanReq(req) {
    var r = {};
    var d = {
      socket: 1,
      connection: 1,
      _readableState: 1,
      client: 1,
      rawHeaders: 1
    };
    for( var k in req ) {
      if( typeof req[k] !== 'function' && !(k in d) ) {
        r[k] = req[k];
      }
    }
    console.log(r);  
}
