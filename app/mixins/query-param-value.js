import QueryParamTracker from './query-param-tracker';
import { oassign }       from '../unicorns';

var QueryParamValue = oassign( {}, QueryParamTracker, {

  getInitialState: function() {
    if( this.paramInitHandledEleseWhere ) {
      return {};
    }
    return this.getParamState(  this.props.store.model.queryParams[this.paramName] );
  },

  getParamValue: function(queryParams) {
    queryParams[this.paramName] = this.state[this.paramName];
  },

  getParamIsDirty: function(toggle) {
    toggle.isDirty = this.state[this.paramName] !== this.defaultParamValue;
  },

  setParamDefault: function(queryParams) {
    var state = this.getParamState(this.defaultParamValue);
    queryParams[this.paramName] = state[this.paramName];
    this.setState( state );
  },

  getParamState: function( withValue ) {
    var state = {};
    state[this.paramName] = withValue;
    return state;
  },

  performQuery(withValue) {
    this.setStateAndPerform( this.getParamState(withValue) );
  },

});

module.exports = QueryParamValue;

