'use strict';

var QueryParamTracker = {

  componentWillMount: function() {
    this.props.store.on('query-params',this.onParamRequest);
  },

  componentWillUnmount: function() {
    this.props.store.removeListener('query-params',this.onParamRequest);
  },

  componentWillReceiveProps: function( props ) {
    if( this.props.store !== props.store ) {
      if( this.props.store ) {
        this.props.store.removeListener('query-params',this.onParamRequest);
      }
      props.store.on('query-params',this.onParamRequest);
    }
  },

  onParamsChanged: function() {
    var name = this.queryParam.name;
    var state = this.getParamState(this.props.store.model.queryParams[name]);
    this.setState( state );
  },

  onParamRequest: function(eventName,value) {
    if( eventName === 'get') {
      this.getParamValue(value);
    } else if( eventName === 'is-dirty') {
      if( !this.queryParam.clean && !value.isDirty ) {
        this.getParamIsDirty(value);
      }
    } else if( eventName === 'set-default') {
      this.setParamDefault(value);
    }
  },

  setStateAndPerform: function(state) {
    var store = this.props.store;
    this.setState( state, store.perform.bind(store) );
  }
};

module.exports = QueryParamTracker;

