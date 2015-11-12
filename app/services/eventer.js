'use strict';

import EventEmitter from 'events';

const MAX_LISTENERS = 50;

class Eventer {

  constructor() {
    this._events = new EventEmitter();
    this._events.setMaxListeners( MAX_LISTENERS );
  }

  on(name,cb) {
    this._events.on(name,cb);
  }

  emit() {
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

