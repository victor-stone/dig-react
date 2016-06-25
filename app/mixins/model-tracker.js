import events from '../models/events';

/*
  Implementors must implement 

    stateFromStore(store) {
      return { someStateDerivedFromStore: ... }
    }
*/
var _methods = {

  componentWillMount() {
    this._modelTrackMounted = true;
    this.props.store.on( events.MODEL_UPDATED, this.onModelUpdate );
  },

  componentWillUnmount() {
    this._modelTrackMounted = false;
    this.props.store.removeListener( events.MODEL_UPDATED, this.onModelUpdate );
  },

  componentWillReceiveProps( props ) {
    if( this.props.store !== props.store ) {
      if( this.props.store ) {
        this.props.store.removeListener( events.MODEL_UPDATED, this.onModelUpdate );
      }
      props.store.on( events.MODEL_UPDATED, this.onModelUpdate );
      this.setState( this._stateFromStore(props.store) );
    }
  },

  onModelUpdate() {
    if( this._modelTrackMounted ) {
      this.setState( this._stateFromStore(this.props.store) );
    }
  },

  _stateFromStore(store) {
    return this.stateFromStore ? this.stateFromStore(store) : {store};
  }
};

var ModelTracker = Object.assign({

  getInitialState() {
    return this._stateFromStore(this.props.store);
  }
}, _methods);

const _classMixin = target => class extends target {
  constructor() {
    super(...arguments);
    this._stateFromStore = _methods._stateFromStore.bind(this);
    this.state = this._stateFromStore(this.props.store);
    this.onModelUpdate = this.onModelUpdate.bind(this);
  }

  componentWillMount() {
    _methods.componentWillMount.call(this);
  }

  componentWillUnmount() {
    _methods.componentWillUnmount.call(this);
  }

  componentWillReceiveProps( props ) {
    _methods.componentWillReceiveProps.call(this,props);
  }

  onModelUpdate() {
    _methods.onModelUpdate.call(this);
  }
};

ModelTracker.extender = _classMixin;

module.exports = ModelTracker;

