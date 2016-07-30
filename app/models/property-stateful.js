import Property from './property';

/*
  A watchable, abstract-translatable property with state.

  One, totally hypothetical, pull-out of thin air usage 
  could define 'dirty' as: 'the user has asked to filter/sort
  the data on a web page different from how it is presented
  by default'
*/

const PropertyStateful = baseclass => class extends baseclass
{
  constructor() {
    super(...arguments);
    this._setsDefaultFromNative = false;
  }

  static deserialize( initValue, Class ) {    
    const instance = Property.deserialize( initValue, Class );
    instance._setsDefaultFromNative && (instance._defaultValue = instance._value);
    return instance;
  }

  get isDirty() {
    return this._value !== this._defaultValue;
  }

  reset() {
    this.isDirty && (this.value = this._defaultValue);
    return this;
  }

};

module.exports = PropertyStateful;