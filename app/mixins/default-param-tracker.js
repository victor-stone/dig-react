import events from '../models/events';

var DefaultParamTracker = {

  componentWillMount: function() {
    this.props.store.on( events.GET_PARAMS_DEFAULT, this.onGetParamsDefault );
  },

  componentWillUnmount: function() {
    this.props.store.removeListener( events.GET_PARAMS_DEFAULT, this.onGetParamsDefault );
  },

  componentWillReceiveProps: function( props ) {
    if( this.props.store !== props.store ) {
      if( this.props.store ) {
        this.props.store.removeListener( events.GET_PARAMS_DEFAULT, this.onGetParamsDefault );
      }
      props.store.on( events.GET_PARAMS_DEFAULT, this.onGetParamsDefault );
    }
  },

};

module.exports = DefaultParamTracker;

