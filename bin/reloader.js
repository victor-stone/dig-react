'use strict';

var fs = require('fs');

var log = function() {}; //console.log;

class Reloader {
  constructor() {
    this.modules = {};
    this.timeStamps = {};
  }

  invalidate(filename) {
    log( 'invalidating hook', filename);
    this.modules[filename] = false;
  }

  reload(filename) {
    if( filename in this.modules ) {
      log( 'file', filename, 'found in reloader modules');

      if( filename in this.timeStamps ) {
        var currRulesTimestamp = fs.statSync(filename).mtime.getTime();
        if( currRulesTimestamp <= this.timeStamps[filename] ) {
          log( 'timstamp ok, returning old value', filename);
          return this.modules[filename];
        }
      }
      if( this.modules[filename] === false ) {
        log( 'module seems to be disabled ', filename);
        return null;
      }
    }
    if( !fs.existsSync(filename) ) {
      log(`reloader file ${filename} doesn't exist` )
      this.modules[filename] = false;
      return null;
    }
    var ret = null;
    try {
      var code = fs.readFileSync(filename,'utf8');
      var module = { exports: {} };
      eval(code);
      var exported = module.exports;
      this.timeStamps[filename] = fs.statSync(filename).mtime.getTime();
      this.modules[filename] = exported;
      log( 'eval of code worked isFunction:', typeof exported === 'function', ' ts: ',
          this.timeStamps[filename] );
      ret = exported;
    } catch(e) {
      console.log( 'Read/Parse error in realoder: ', filename, e.message );
      this.modules[filename] = false;
    }
    return ret;
  }
}

module.exports = Reloader;
