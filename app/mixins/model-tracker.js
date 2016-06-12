import events from '../models/events';

/*
  Implementors must implement 

    stateFromStore(store) {
      return { someStateDerivedFromStore: ... }
    }
*/
var ModelTracker = {

  getInitialState() {
    return this.stateFromStore(this.props.store);
  },

  componentWillMount() {
    this._modelTrackMounted = this;
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
      this.setState( this.stateFromStore(props.store) );
    }
  },

  onModelUpdate() {
    if( this._modelTrackMounted ) {
      this.setState( this.stateFromStore(this.props.store) );
    }
  },
};


module.exports = ModelTracker;

