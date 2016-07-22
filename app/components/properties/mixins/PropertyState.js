import { safeSetState } from '../../../unicorns';

const PropertyState = target => class extends target {

  constructor() {
    super(...arguments);
    this.onValueChanged = this.onValueChanged.bind(this);
    this.onChangeValue  = this.onChangeValue.bind(this);

    const { property, store } = this.props;
    
    this.property = store.addProperty(property);
    
    if( this.props.writeOnly ) {
      safeSetState( this, { value: '' } );
    } else {
      this.property.onChange( this.onValueChanged );
      safeSetState( this, { value: this.property.value } );
    }

    this.hasSuperShouldComponentUpdate = !!super.shouldComponentUpdate;
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.value !== nextState.value 
              || !!(this.hasSuperShouldComponentUpdate && super.shouldComponentUpdate(...arguments));
  }
  
  onValueChanged(property, postStateCallback) {
    if( property.value !== this.state.value ) {
      this.setState( { value: property.value }, postStateCallback );
    }
  }

  onChangeValue(value) {
    this.property.value = value;
  }
};

module.exports = PropertyState;

