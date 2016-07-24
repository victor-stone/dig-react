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

  static deserialize( hash, Class ) {
    const instance = new Class();
    instance.deserialize(hash[instance.name]);
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
    if( val !== this._value ) {
      this._value = val;
      this.onChange();
    }
  }

  /*
      add these to derived classes
      when the format to be edited
      is different than that 
      displayed
  */
  /*
  set editable(val) {
    super.value = val;
  }

  get editable() {
    return super.value;
  }
  */
  
  deserialize(val) {
    this.value = val;
  }

  serialize() {
    return this.value;
  }

  onChange(listener) {
    if( typeof listener === 'undefined') {
      if( !this._inPropertyChangeEvent ) {
        this._inPropertyChangeEvent = true;
        this.emit( events.PROPERTY_CHANGED, this );
        this._inPropertyChangeEvent = false;
      }
    } else {
      this.on( events.PROPERTY_CHANGED, listener );
    }
    return this;
  }

}


module.exports = YeOldWatchableJavascriptProperty;
