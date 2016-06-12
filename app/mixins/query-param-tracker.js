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

  onParamsChanged(queryParams) {
    this.setState( this.stateFromParams(queryParams) );
  },

  refresh(opts) {
    this.props.store.refresh(opts);
  },

  refreshModel(opts) {
    this.props.store.refreshModel(opts);
  },
  
};

module.exports = QueryParamTracker;

