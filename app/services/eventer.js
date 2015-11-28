'use strict';

import EventEmitter from 'events';
import events       from '../models/events';

function isValidEvent(event) {
  var found = false;
  Object.keys(events).forEach( e => {
    if( events[e] === event ) {
      found = true;
    }
  });
  return found;
}

const MAX_LISTENERS = 50;

class Eventer {

  constructor() {
    this._events = new EventEmitter();
    this._events.setMaxListeners( MAX_LISTENERS );
  }

  on(name,cb) {
    if( !isValidEvent(name) ) {
      throw new Error(`trying to register for an unknown event ${name}`);
    } 
    this._events.on(name,cb);
  }

  emit() {
    if( !isValidEvent(arguments[0]) ) {
      throw new Error(`trying to emit an unknown event ${name}`);
    } 
    this._events.emit.apply(this._events,arguments);
  }

  removeListener(name,cb) {
    this._events.removeListener(name,cb);
  }

  once() {
    this._events.once.apply(this._events,arguments);
  }  
}

module.exports = Eventer;

