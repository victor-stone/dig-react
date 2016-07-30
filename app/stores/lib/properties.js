
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

  addProperty( PropertyClass, initialValue ) {

    const { propertyName:name } = PropertyClass;

    if( this._properties.has(name) ) {
      return this._properties.get(name);
    }
    
    const property = PropertyClass.deserialize( initialValue, PropertyClass );

    property.onChange( this.onPropertyChange );

    this._properties.set(name, property);
    
    return property;
  }

  getProperty(PropertyClassOrName) {

    const { propertyName:name = PropertyClassOrName } = PropertyClassOrName;

    return this._properties.get(name);
  }

  hasProperty(name) {
    return this._properties.has(name);
  }

  onPropertyChange(property) {

    if( property._pleaseToIgnore ) {
      return;
    }
    
    const { name } = property;

    const currentNativeValue     = this.nativeProperties[name].toString();
    
    const proposedNewNativeValue = property.serialize(currentNativeValue);

    if( currentNativeValue !== proposedNewNativeValue ) {
    
      this.applyProperties( { [name]: proposedNewNativeValue }, () => {

        // some complex properties (like description texts) need
        // be re-deserialized to update themselves for display
        // but this also allows for the server to restate the 
        // value in some way

        property._pleaseToIgnore = true;
        property.deserialize(this.nativeProperties[name]);
        delete property._pleaseToIgnore;
      });
    }
  }

};

module.exports = Properties;
