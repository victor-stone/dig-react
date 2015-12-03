import events from '../models/events';

var URIParamTracker = {

  componentWillMount: function() {
    this.props.store.on( events.GET_PARAMS_URI, this.onGetParamsURI );
  },

  componentWillUnmount: function() {
    this.props.store.removeListener( events.GET_PARAMS_URI, this.onGetParamsURI );
  },

  componentWillReceiveProps: function( props ) {
    if( this.props.store !== props.store ) {
      if( this.props.store ) {
        this.props.store.removeListener( events.GET_PARAMS_URI, this.onGetParamsURI );
      }
      props.store.on( events.GET_PARAMS_URI, this.onGetParamsURI );
    }
  },

};

module.exports = URIParamTracker;

