
import QueryParamTracker from './query-param-tracker';
import { oassign }       from '../unicorns';


var QueryParamEnum = oassign( {}, QueryParamTracker, {

  getInitialState: function() {
    if( this.queryParam.avoidInitConflict ) {
      return {};
    }
    var name    = this.queryParam.name;
    var qp      = this.props.store.model.queryParams;
    var state   = { };
    state[name] = qp[name] || this.queryParam.initValue;
    return state ;    
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
    var state = {};
    state[name] = queryParams[name] = this.queryParam.initValue;
    this.setState( state );
  },

  performQuery() {
    var name = this.queryParam.name;
    var state = {};
    state[name] = this.refs[name].value;
    this.setStateAndPerform( state );
  },

});

module.exports = QueryParamEnum;

