'use strict';

var Reloader = require('./reloader');

var log = function() {}; //console.log;

class ServerHook {
  constructor(sysLog, appLog) {
    this.hooks = {};
    this.sysLog = sysLog;
    this.appLog = appLog;
    this.reloader = new Reloader();
  }

  installHook(filename) {
    log( 'Installing hook', filename);
    if( filename ) {
      this.hooks[filename] = true;
    }
  }

  validateRequest(req,res) {
    var filenames = Object.keys(this.hooks);
    log( 'searching through hooks', filenames);
    filenames.forEach( filename => {
      log( 'reloading request ', filename);
      var hook = this.hooks[filename] = this.reloader.reload(filename);
      if( hook ) {
        log( 'got hook function isFunction:', typeof hook === 'function' );
        try {
          if( !hook( { req, res, sysLog: this.sysLog, appLog:this.appLog } ) ) {
            log( 'hook return false');
            return false;
          }
        }
        catch(e) { 
          this.sysLog.write( { serverHook: filename, exception: e } );
          this.reloader.invalidate(filename);
          // we can't tell if the req is valid so we 
          // let it pass
        }
      } else {
        log( 'did not get a hook back, seems to be invalid')
      }
    });
    return true;
  }
}

module.exports = ServerHook;
