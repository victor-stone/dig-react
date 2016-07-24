import { safeSetState } from '../../../unicorns';

const PropertyState = target => class extends target {

  constructor() {
    super(...arguments);
    this.onValueChanged = this.onValueChanged.bind(this);
    this.updateValue  = this.updateValue.bind(this);

    const { property, store } = this.props;
    
    this.property = store.addProperty(property);
    
    this._propHasEditValue = 'editable' in this.property;

    if( this.props.writeOnly ) {
      safeSetState( this, { value: '', editable: '' } );
    } else {
      this.property.onChange( this.onValueChanged );
      safeSetState( this, this._stateFromProperty(this.property) );
    }

    this.superShouldComponentUpdatePS = (() => {
            let mySuperCall = super.shouldComponentUpdate;
            return mySuperCall 
                      ? (p,s) => mySuperCall.apply(this,[p,s])
                      : () => false;
          })();
  }

  get stateEditValue() {
    return this._propHasEditValue ? this.state.editable : this.state.value;
  }

  set stateEditValue(val) {
    this.setState( { [this._propHasEditValue ? 'editable' : 'value']: val } );
  }

  _stateFromProperty(property) {
    const state = { value: property.value };
    if( this._propHasEditValue ) {
      state.editable = property.editable;
    }
    return state;    
  }

  _propertyOutOfSync(oneThing, another) {
    const editValDirty = this._propHasEditValue && oneThing.editable !== another.editable;
    return editValDirty || oneThing.value !== another.value;
  }

  shouldComponentUpdate(nextProps,nextState) {
    // it's a little weird to check for 'editing' here but
    // at least if the base class doesn't implement it
    // that will always yeild 'true' in the logic below
    return this.superShouldComponentUpdatePS(nextProps,nextState) || 
              (!this.state.editing && this._propertyOutOfSync(this.state,nextState));
  }
  
  onValueChanged(property, postStateCallback) {
    if( this._propertyOutOfSync(property,this.state) ) {
      this.setState( this._stateFromProperty(property), postStateCallback );      
    }
  }

  updateValue(value) {
    if( this._propHasEditValue ) {
      this.property.editable = value;
    } else {
      this.property.value = value;
    }
  }
};

module.exports = PropertyState;

