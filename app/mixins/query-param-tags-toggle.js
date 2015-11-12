
import QueryParamTracker from './query-param-tracker';
import { oassign,
         TagString }     from '../unicorns';


var QueryParamTagsToggle = oassign( {}, QueryParamTracker, {

  getInitialState: function() {
    if( this.queryParam.avoidInitConflict ) {
      return {};
    }
    var name           = this.queryParam.name;
    var qp             = this.props.store.model.queryParams;
    var tags           = qp[name];
    var state          = { toggle: TagString.contains(tags,this.queryParam.model) };
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
    var name = this.queryParam.name;
    var tags = new TagString(queryParams[name]);
    var val  = this.queryParam.model;
    if( toggle ) {
      tags = tags.add(val);
    } else {
      tags = tags.remove(val);
    }
    queryParams[name] = tags.toString();
  },

  performQuery: function() {
    this.setStateAndPerform({ toggle: !this.state.toggle });
  },

});

module.exports = QueryParamTagsToggle;

