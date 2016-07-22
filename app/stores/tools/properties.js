
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
    
    const property = PropertyClass.fromValue( this.nativeProperties, PropertyClass )
                                  .onChange( this.onPropertyChange );
    this._properties.set(PropertyClass, property);
    
    return property;
  }

  getProperty(PropertyClass) {
    return this._properties.get(PropertyClass);
  }

  onPropertyChange(property) {
    const { name } = property;
    const nativeValue = this.nativeProperties[name];
    const value = property.toNative ? property.toNative(nativeValue) : nativeValue;
    this.applyProperties( { [name]: value } );
  }

  get nativeProperties() {
    return this;
  }

};

module.exports = Properties;
