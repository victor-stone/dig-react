
import QueryParamTracker from './query-param-tracker';
import { oassign }       from '../unicorns';


var QueryParamToggle = oassign( {}, QueryParamTracker, {

  getInitialState: function() {
    if( this.queryParam.avoidInitConflict ) {
      return {};
    }
    var qp             = this.props.store.model.queryParams;
    var value          = qp[this.queryParam.name];
    var state          = { toggle: value === this.queryParam.valueON };
    this.defaultToggle = state.toggle;
    return state ;    
  },

  getParamValue: function(queryParams) {
    this._assignToQueryParams(queryParams,this.state.toggle);
  },

  getParamIsDirty: function(toggle) {
    toggle.isDirty = this.state.toggle !== this.defaultToggle;
  },

  setParamDefault: function(queryParams) {
    this._assignToQueryParams(queryParams,this.defaultToggle);
    var state = { toggle: this.defaultToggle };
    this.setState( state );
  },

  _assignToQueryParams: function(queryParams,toggle) {
    var q = this.queryParam;
    queryParams[q.name] = toggle ? q.valueON : q.valueOFF;
  },

  performQuery: function() {
    this.setStateAndPerform({ toggle: !this.state.toggle });
  },

});

module.exports = QueryParamToggle;

