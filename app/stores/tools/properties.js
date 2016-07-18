
/*
  The addProperty and default onPropertyChange assumes:

    get nativeProperties()

  The default is to return 'this'

*/
const Properties = target => class extends target {

  constructor() {
    super(...arguments);
    this._properties      = new Map();
    this.onPropertyChange = this.onPropertyChange.bind(this);
  }

  addProperty(PropertyClass) {

    if( this._properties.has(PropertyClass) ) {
      return this._properties.get(PropertyClass);
    }
    
    const property = PropertyClass.fromNative( this.nativeProperties, PropertyClass ).onChange( this.onPropertyChange );
    this._properties.set(PropertyClass, property);
    
    return property;
  }

  injectProperty(PropertyClass,property) {

    if( !this._properties.has(PropertyClass) ) {
      this._properties.set(PropertyClass,property);
      property.onChange( this.onPropertyChange );
    }
    
    return property;
  }

  removeProperty(PropertyClass) {
    this._properties.delete(PropertyClass);
  }

  getProperty(PropertyClass) {
    return this._properties.get(PropertyClass);
  }

  onPropertyChange(property) {
    const { name } = property;
    this.applyProperties( { [name]: property.toNative(this.nativeProperties[name]) } );
  }

  get nativeProperties() {
    return this;
  }

};

module.exports = Properties;
