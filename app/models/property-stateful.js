import PropertyTranslator from './property-translator';

/*
  A watchable, abstract-translatable property with state.

  One, totally hypothetical, pull-out of thin air usage 
  could define 'dirty' as: 'the user has asked to filter/sort
  the data on a web page different from how it is presented
  by default'
*/

class PropertyStateful extends PropertyTranslator
{
  constructor() {
    super(...arguments);
    this._defaultValue = null;
    this._setsDefaultFromNative = false;
  }

  get isDirty() {
    return this._value !== this._defaultValue;
  }

  reset() {
    this.value = this._defaultValue;
    return this;
  }

  fromNative(val) {
    super.fromNative(val);
    if( this._setsDefaultFromNative ) {
      this._defaultValue = this._value;
    }
  }
}

module.exports = PropertyStateful;