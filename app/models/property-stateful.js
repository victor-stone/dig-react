
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
    super();
    this._setsDefaultFromNative = false;
  }

  get isDirty() {
    return this._value !== this._defaultValue;
  }

  reset() {
    this.value = this._defaultValue;
    return this;
  }

  deserialize(val) {
    super.deserialize(val);
    if( this._setsDefaultFromNative ) {
      this._defaultValue = this._value;
    }
  }
};

module.exports = PropertyStateful;