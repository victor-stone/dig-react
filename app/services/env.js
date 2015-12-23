/* eslint no-console:0 */
import { oassign } from '../unicorns';
import Eventer     from './eventer';
import events      from '../models/events';
 
const TEN_SECONDS = 10000;

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

  set message(msgComponent) {
    this.emit( events.APP_MSG, msgComponent );
    setTimeout( () => this.emit( events.APP_MSG, null ), TEN_SECONDS);
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
}


module.exports = new Env();

