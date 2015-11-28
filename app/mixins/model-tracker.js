import events from '../models/events';

/*
  Implementors must implement 

    stateFromStore: function(store) {
      return { someStateDerivedFromStore: ... }
    }
*/
var PlaylistUpdater = {

  getInitialState: function() {
    return this.stateFromStore(this.props.store);
  },

  componentWillMount: function() {
    this.props.store.on( events.MODEL_UPDATED, this.onModelUpdate );
  },

  componentWillUnmount: function() {
    this.props.store.removeListener( events.MODEL_UPDATED, this.onModelUpdate );
  },

  componentWillReceiveProps: function( props ) {
    if( this.props.store !== props.store ) {
      if( this.props.store ) {
        this.props.store.removeListener( events.MODEL_UPDATED, this.onModelUpdate );
      }
      props.store.on( events.MODEL_UPDATED, this.onModelUpdate );
      this.setState( this.stateFromStore(props.store) );
    }
  },

  onModelUpdate: function() {
    this.setState( this.stateFromStore(this.props.store) );
  },
};


module.exports = PlaylistUpdater;

