
console.log('Making Server Rules');

var just_one = false;


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

var validationTests = [

  function(req,res) {
    var catchCrawler = req.url.match(/offset=([0-9]+)/);
    if( catchCrawler !== null ) {
        if( Number(catchCrawler[1]) > 30000 ) {
          res.sendStatus(500);
          res.end();
          return false;
        }
    }
    return true;    
  },

  function(req,res) {
    var userAgent = req.headers['user-agent'];
    if( req.url.match(/^\/dig/) && userAgent.match(/Dalvik/) ) {
      res.sendStatus(404);
      res.end();
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

function skipThese(req,res) {
  return req.url.match(/(.js|.css|.html|.png|.eot|.otf|.ttf|.woff|.woff2|woff2\?v\=4.4\.0|.svg|.jpg|.jpeg|.ico)$/) !== null;
}

_serverRules = function(req,res) {

  if( skipThese(req,res) ) {
    return true;
  }

  var ip = req.connection.remoteAddres || 'ip?';
  console.log( 'Validating ', req.url, ip, req.headers['user-agent']);

  if( !isValidRequest(req,res) ) {
    return false;
  }

  if( !just_one ) {
    //dumpCleanReq(req);
    just_one = true;
  }
  //throw(new Error('yo mama'));
  return true;
};