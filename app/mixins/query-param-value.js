import QueryParamTracker from './query-param-tracker';
import { oassign }       from '../unicorns';

var QueryParamValue = oassign( {}, QueryParamTracker, {

  getInitialState: function() {
    if( this.queryParam.avoidInitConflict ) {
      return {};
    }
    var name = this.queryParam.name;
    return this.getParamState(  this.props.store.model.queryParams[name] );
  },

  getParamValue: function(queryParams) {
    var name = this.queryParam.name;
    queryParams[name] = this.state[name];
  },

  getParamIsDirty: function(toggle) {
    var name = this.queryParam.name;
    toggle.isDirty = this.state[name] !== this.queryParam.initValue;
  },

  setParamDefault: function(queryParams) {
    var name = this.queryParam.name;
    var state = this.getParamState(this.queryParam.initValue);
    queryParams[name] = state[name];
    this.setState( state );
  },

  getParamState: function( withValue ) {
    var name = this.queryParam.name;
    var state = {};
    state[name] = withValue;
    return state;
  },

  performQuery(withValue) {
    this.setStateAndPerform( this.getParamState(withValue) );
  },

});

module.exports = QueryParamValue;

