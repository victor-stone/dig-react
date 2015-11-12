
import QueryParamTracker from './query-param-tracker';
import { oassign,
         TagString }     from '../unicorns';


var QueryParamTagsToggle = oassign( {}, QueryParamTracker, {

  getInitialState: function() {
    var qp             = this.props.store.model.queryParams;
    var tags           = qp[this.paramName];
    var state          = { toggle: TagString.contains(tags,this.tagsValue) };
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
    var tags = new TagString(queryParams[this.paramName]);
    if( toggle ) {
      tags = tags.add(this.tagsValue);
    } else {
      tags = tags.remove(this.tagsValue);
    }
    queryParams[this.paramName] = tags.toString();

  },

  performQuery: function() {
    this.setStateAndPerform({ toggle: !this.state.toggle });
  },

});

module.exports = QueryParamTagsToggle;

