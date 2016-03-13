import events from '../models/events';

var QueryParamTracker = {

  getInitialState: function() {
    return this.stateFromParams(this.props.store.queryParams);
  },

  componentWillMount: function() {
    this.props.store.on( events.PARAMS_CHANGED, this.onParamsChanged );
  },

  componentWillUnmount: function() {
    this.props.store.removeListener( events.PARAMS_CHANGED, this.onParamsChanged );
  },

  componentWillReceiveProps: function( props ) {
    if( this.props.store !== props.store ) {
      if( this.props.store ) {
        this.props.store.removeListener( events.PARAMS_CHANGED, this.onParamsChanged );
      }
      props.store.on( events.PARAMS_CHANGED, this.onParamsChanged );
    }
  },

  onParamsChanged: function(queryParams) {
    this.setState( this.stateFromParams(queryParams) );
  },

  refresh: function(opts) {
    this.props.store.refresh(opts);
  },

  refreshHard: function(opts) {
    this.props.store.refreshHard(opts);
  },
  
};

module.exports = QueryParamTracker;

