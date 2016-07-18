import Property from './property';

/*
  A PropertyTranslator translates from an abstraction to a 
  native representation.

  The 'value' property gets and set the abstract value.

  The 'nativeValue' property get and sets the native value 
  the host can readily understand
  
  For example: specific UI controls instantiate specific 
  PropertyTranslator's and push them into a Store which 
  is aware of the base class abstractions.

  Internals: 
    The value of '_value' is the native value . Derivations
    use the 'value' setter/getter to do translation to and 
    from the abstracted value. 
*/

class PropertyTranslator extends Property
{

  set value(val) {
    super.value = this.fromAbstract(val);
  }

  fromAbstract(val) {
    return val;
  }

  get value() {
    return this.toAbstract();
  }

  toAbstract() {
    return this._value;
  }  
  
  toNative(/*currentValue*/) {
    return this._value;
  }

  fromNative(val) {
    this._value = val;
  }
}

PropertyTranslator.fromNative = ( hash, ClassName ) => {
  const instance = new ClassName();
  instance.fromNative(hash[instance.name]);
  return instance;
};

module.exports = PropertyTranslator;
