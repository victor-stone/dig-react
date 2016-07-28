import { safeSetState,
         bindAll        } from '../../../unicorns';

/*
  Here's the unfortunate part about this: This 
  requires a store to make it all work. This was 
  a mistake in the architecture. The majority
  of contorls that represent a property or a filter
  only care about that property or filter. They
  never see the store or anything related to it
  except to wire up the property and get an instance
  back, all of which is done here, buried in the mixin
  away from the actual control.

  TODO: break apart property/filter knowledge from stores
*/
const PropertyState = target => class extends target {

  constructor() {
    super(...arguments);

    // by pre-binding updateValue you can just send it
    // directly into controls' that have the same
    // signature e.g. onDone(value)

    bindAll( this, 'onValueChanged', 'updateValue' );

    safeSetState( this, this._setupStore(this.props.store) );

    /*
      Checking 'super' seem to be insanely costly in 
      Babel. We curry the results here so we can
      just do a straight call.
    */
    const superCurry = meth => {
      let mySuperCall = super[meth];
      return mySuperCall 
                ? (a,b,c,d,e) => mySuperCall.apply(this,[a,b,c,d,e]) 
                : () => false;
    };

    this.superShouldComponentUpdatePS = superCurry('shouldComponentUpdate');

  }

  // Allow derived classes to define PropertyClass on
  // the fly and override this.props.property

  get PropertyClass() {
    return null;
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.superShouldComponentUpdatePS(nextProps,nextState) || 
              !this._cmp(this.state,nextState);
  }

  componentWillMount() {
    this._mounted = true;
    this._hookProperty();
  }

  componentWillReceiveProps({ store }) {

    if( this.props.store !== store ) {

      this._unhookProperty();

      this.setState( this._setupStore(store), () => this._hookProperty() );
    }
  }

  componentWillUnmount() {
    
    this._mounted = false;

    !this.props.writeOnly && this.property.removeChangeListener(this.onValueChanged);
  }

  // The property triggers this event

  onValueChanged(property) {
    !this._cmp(property,this.state) && this.setState( this.stateFromProperty(property) );      
  }

  // Call this to write a new value (we write to property.editable)

  updateValue(value) {
    // just as a safeguard, technically should 
    // not need the _mounted flag

    this._mounted && (this.property.editable = value);
  }

  // Call this for onCancel

  resetValue() {
    this.property.reset();
  }



  /* --- internal helpers ---- */

  stateFromProperty({ value, editable }) {
    return { value, editable };
  }

  _hookProperty() {
    !this.props.writeOnly && this.property.onChange( this.onValueChanged );      
  }

  _unhookProperty() {
    !this.props.writeOnly && this.property && this.property.removeChangeListener( this.onValueChanged );
  }

  _cmp( oneThing, { value, editable } ) {
    return oneThing.value === value && oneThing.editable === editable;
  }

  _setupStore(store) {
    
    const { 
      writeOnly, 
      Property = this.PropertyClass } = this.props;
    
    this.property = this.props.property || (store && store.addProperty(Property));
    
    return writeOnly 
              ? { value: '', editable: '' }
              : this.stateFromProperty(this.property);
  }

};

module.exports = PropertyState;

