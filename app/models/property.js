import Eventer from '../services/eventer';
import events  from './events';

class YeOldWatchableJavascriptProperty extends Eventer 
{
  constructor() {
    super();
    this._value        = undefined;
    this._propName     = '_unnamed_';
    this._displayName  = '_Un-Named_';
  }

  static fromValue( hash, ClassName ) {
    const instance = new ClassName();
    instance.value = hash[instance.name];
    return instance;
  }

  get displayName() {
    return this._displayName;
  }

  get name() {
    return this._propName;
  }
  
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange();
  }

  onChange(listener) {
    if( typeof listener === 'undefined') {
      this.emit( events.PROPERTY_CHANGED, this );
    } else {
      this.on( events.PROPERTY_CHANGED, listener );
    }
    return this;
  }

}


module.exports = YeOldWatchableJavascriptProperty;
