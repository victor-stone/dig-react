
/*
  A PropertyTranslator translates from an abstraction to a 
  native representation.

  The 'value' property gets and set the abstract value.

  Derivations should keep the value of '_value' as the 
  native value and implement to/fromAbstract to translate 
  between native and abstracted values. 
*/

const PropertyTranslator = baseclass => class extends baseclass
{
  set value(val) {
    super.value = this.fromAbstract(val);
  }

  get value() {
    return this.toAbstract();
  }

  fromAbstract(val) {
    return val;
  }

  toAbstract() {
    return this._value;
  } 

  serialize() {
    return this._value;
  }
  
};

module.exports = PropertyTranslator;
