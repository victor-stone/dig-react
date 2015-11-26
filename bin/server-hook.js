'use strict';

var url = require('url');

var validationTests = [

  function(req,res) {
    var catchCrawler = req.url.match(/offset=([0-9]+)/);
    if( catchCrawler !== null ) {
        if( Number(catchCrawler[1]) > 30000 ) {
          res._handled = true;
          res.statusCode = 500;
          res.end();
          return false;
        }
    }
    return true;    
  },

  function(req,res) {
    var userAgent = req.headers['user-agent'];
    if( !userAgent || userAgent.match(/\u0044\u0061\u006c\u0076/) ) {
      res._handled = true;
      res.statusCode = 500;
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

class EWrap {
  constructor(e,stack) {
    this.e = e;
    this.stack = stack;
  }
  toString() {
    return this.e;
  }
}

function isInternal(req,res,sysLog) {
  var pieces = url.parse(req.url,true);
  if( pieces.pathname !== '/api/report' ) {
    return false;
  }
  req.url = pieces.pathname;
  sysLog.logRequest(req,res,new EWrap(pieces.query.err,pieces.query.stack));
  req._handled = true;
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader( 'Content-Type', 'application/json' );
  res.statusCode = 200;
  res.end('["ok"]');
  return true;
}

class ServerHook {
  constructor(sysLog, appLog) {
    this.sysLog = sysLog;
    this.appLog = appLog;
  }

  validateRequest(req,res) {
    if( !this._validateRequest(req,res) ) {
      if( !res._handled ) {
        res.statusCode = 500;
        res.end('500 Server error');
      }
      return false;      
    }
    return true;
  }

  _validateRequest(req,res) {
    if( skipThese(req,res) ) {
      return true;
    }

    try {

      if( isInternal(req,res,this.sysLog) ) {
        return false;
      }

      if( !google404s(req,res) ) {
          return false;
        }

      if( !isValidRequest(req,res) ) {
        return false;
      }

    } catch(e) {
      res._handled = true;
      this.sysLog.logRequest(req,res,e);
      return false;
    }

    return true;
  }
}

module.exports = ServerHook;
