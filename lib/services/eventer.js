import EventEmitter    from 'events';
import events          from '../models/events';
import { LibArray }    from 'unicorns';

var _knownEvents = null;
function isValidEvent(event) {
  if( event.charAt(0) === '_' ) {
    return true;
  }
  if( !_knownEvents ) {
    _knownEvents = LibArray.from( Object.keys(events), e => events[e] );
  }
  return _knownEvents.includes(event);
}

const MAX_LISTENERS = 50;

class Eventer {

  constructor(validateEvents = true) {
    this.__events = new EventEmitter();
    this.__events.setMaxListeners( MAX_LISTENERS );
    this._validateEvents = validateEvents;
  }

  on(name,cb) {
    if( !isValidEvent(name) ) {
      throw new Error(`trying to register for an unknown event ${name}`);
    } 
    this.__events.on(name,cb);
  }

  emit() {
    if( !isValidEvent(arguments[0]) ) {
      throw new Error(`trying to emit an unknown event ${name}`);
    } 
    this.__events.emit.apply(this.__events,arguments);
  }

  removeListener(name,cb) {
    this.__events.removeListener(name,cb);
  }

  once() {
    this.__events.once.apply(this.__events,arguments);
  }  
}

module.exports = Eventer;

