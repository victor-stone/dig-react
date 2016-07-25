import Property from '../property';

/*
  Represents a property with the shape:

    { 
      html: '',   // formatted for display
      plain: '',  // stripped of html
      native: '', // bbCode (user editable)
    }

  This class does NOT allow setting .value 
  directly because it makes no semantic sense.

  You can call deserialize() with the right
  hash and you can set .editable with native
  text.
  
*/
class Text extends Property
{
  constructor(propName) {
    super();
    this._propName = propName;
    this._value    = { html: '', plain: '', native: '' };
  }

  deserialize(rawTextObject) {
    this._value = (Object.assign({}, rawTextObject));
    this._defaultValue = Object.assign({}, rawTextObject);
    this.onChange();
  }

  serialize() {
    return this.nativeText;
  }

  // 'value' is readonly here

  get value() {
    return this.html;
  }

  // called from UI editor

  get editable() {
    return this.nativeText;
  }

  set editable(nativeText) {
    this._value.native = nativeText;
    this.onChange();
  }

  reset() {
    Object.assign( this._value, this._defaultValue );
    return this;
  }  

  get html() {
    return this._value.html;
  }

  get plainText() {
    return this._value.plain;
  }

  get nativeText() {
    return this._value.native;
  }

}


module.exports = Text;