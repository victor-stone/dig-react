
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
    
    const property = PropertyClass.deserialize( this.nativeProperties, PropertyClass )
                                  .onChange( this.onPropertyChange );
    this._properties.set(PropertyClass, property);
    
    return property;
  }

  getProperty(PropertyClass) {
    return this._properties.get(PropertyClass);
  }

  onPropertyChange(property) {
    if( property._pleaseToIgnore ) {
      return;
    }
    
    const { name } = property;
    const value    = property.serialize(this.nativeProperties[name]);

    this.applyProperties( { [name]: value }, () => {
      const newishValue = this.nativeProperties[name];
      if( newishValue !== value ) {
        property._pleaseToIgnore = true;
        property.deserialize(newishValue);
        delete property._pleaseToIgnore;
      }
    });
  }

  get nativeProperties() {
    return this;
  }

};

module.exports = Properties;
