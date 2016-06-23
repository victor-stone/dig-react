/* eslint no-console:0 */
import { oassign } from '../unicorns';
import Eventer     from './eventer';
import events      from '../models/events';
 
class Env extends Eventer {

  constructor() {
    super(...arguments);
  }

  set(opts) {
    oassign(this,opts);
  }

  get(name) {
    return this[name];
  }

  log() {
    if( this.debugMode ) {
      console.log(...arguments);
    }
  }

  alert(type,message) {
    this.emit( events.APP_ALERT, type, message );
  }

  showPopup( component, props ) {
    this.emit( events.REQUEST_MODAL, component, props );
  }
  
  error(e) {
    this.error = e;
    this.log('caught error',e.stack);
    this.emit('error',e);
  }

  assert( truthyTest, msg, doThrow ) {
    if( this.debugMode ) {
      if( !truthyTest ) {
        if( doThrow ) {
          throw new Error(msg);
        } else {
          console.error('ASSERT FAILED', msg);
        }
      }
    }
  }

  verifyClasses(...cls) {
    for( const c in cls ) {
      this.assert( c, 'broken import', true);
    }
  }
}


module.exports = new Env();

