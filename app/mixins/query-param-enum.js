
import QueryParamTracker from './query-param-tracker';
import { oassign }       from '../unicorns';


var QueryParamEnum = oassign( {}, QueryParamTracker, {

  getInitialState: function() {
    var qp = this.props.store.model.queryParams;
    var state = { };
    state[this.paramName] = qp[this.paramName] || this.defaultParamValue;
    return state ;    
  },

  getParamValue: function(queryParams) {
    queryParams[this.paramName] = this.state[this.paramName];
  },

  getParamIsDirty: function(toggle) {
    toggle.isDirty = this.state[this.paramName] !== this.defaultParamValue;
  },

  setParamDefault: function(queryParams) {
    var state = {};
    state[this.paramName] = queryParams[this.paramName] = this.defaultParamValue;
    this.setState( state );
  },

  performQuery() {
    var state = {};
    state[this.paramName] = this.refs[this.paramName].value;
    this.setStateAndPerform( state );
  },

});

module.exports = QueryParamEnum;

