import { safeSetState } from '../../../unicorns';

const PropertyState = target => class extends target {

  constructor() {
    super(...arguments);
    this.onValueChanged = this.onValueChanged.bind(this);
    this.updateValue  = this.updateValue.bind(this);

    const { store } = this.props;
    
    safeSetState( this, this._setupStore(store) );

    /*
      Checking 'super' seem to be insanely costly in 
      Babel. We curry the results here so we can
      just do a straight call.
    */
    this.superShouldComponentUpdatePS = (() => {
            let mySuperCall = super.shouldComponentUpdate;
            return mySuperCall 
                      ? (p,s) => mySuperCall.apply(this,[p,s])
                      : () => false;
          })();
  }

  // Allow derived classes to define PropertyClass on
  // the fly and override this.props.property

  get PropertyClass() {
    return null;
  }

  _stateFromProperty(property) {
    return { 
      value: property.value, 
      editable: property.editable
    };
  }

  _hookProperty() {
    !this.props.writeOnly && this.property.onChange( this.onValueChanged );      
  }

  _cmp(oneThing, orAnother) {
    return oneThing.value === orAnother.value && oneThing.editable === orAnother.editable;
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.superShouldComponentUpdatePS(nextProps,nextState) || 
              !this._cmp(this.state,nextState);
  }

  componentWillMount() {
    this._mounted = true;
    this._hookProperty();
  }

  componentWillReceiveProps(nextProps) {

    if( this.props.store !== nextProps.store ) {

      this.property && this.property.removeChangeListener(this.onValueChanged);

      this.setState( this._setupStore(nextProps.store), () => this._hookProperty() );
    }
  }

  _setupStore(store) {
    
    const { 
      writeOnly, 
      property = this.PropertyClass 
    } = this.props;
    
    this.property = store.addProperty(property);
    
    return writeOnly 
              ? { value: '', editable: '' }
              : this._stateFromProperty(this.property);
  }

  componentWillUnmount() {
    this._mounted = false;

    !this.props.writeOnly && this.property.removeChangeListener(this.onValueChanged);
  }

  onValueChanged(property) {
    !this._cmp(property,this.state) && this.setState( this._stateFromProperty(property) );      
  }

  updateValue(value) {
    // just as a safeguard, technically should 
    // not need the _mounted flag

    this._mounted && (this.property.editable = value);
  }

};

module.exports = PropertyState;

