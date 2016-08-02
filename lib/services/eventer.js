import EventEmitter    from 'events';
import events          from 'models/events';
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

class Eventer extends EventEmitter 
{
  constructor() {
    super();
    this.setMaxListeners( MAX_LISTENERS );
    const env = require('services/env');
    this._validateEvents = env.debugMode;
  }

  on(name,cb) {
    if( this._validateEvents && !isValidEvent(name) ) {
      throw new Error(`trying to register for an unknown event ${name}`);
    } 
    super.on(name,cb);
  }

  emit() {
    if( this._validateEvents && !isValidEvent(arguments[0]) ) {
      throw new Error(`trying to emit an unknown event ${name}`);
    } 
    super.emit.apply(this,arguments);
  }
}

module.exports = Eventer;

