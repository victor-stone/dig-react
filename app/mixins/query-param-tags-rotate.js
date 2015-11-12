'use strict';
import QueryParamTracker      from './query-param-tracker';
import { oassign, TagString } from '../unicorns';


var QueryParamTagsRotate = oassign( {}, QueryParamTracker, {

  getInitialState: function() {
    var qp          = this.props.store.model.queryParams;
    var state       = { tag: TagString.filter(qp[this.paramName],this.tagFilter).toString() };
    this.defaultTag = state.tag;
    return state ;    
  },

  getParamValue: function(queryParams) {
    this._assignToQueryParams(queryParams, this.state.tag);
  },

  getParamIsDirty: function(toggle) {
    toggle.isDirty = this.state.tag !== this.defaultTag;
  },

  setParamDefault: function(queryParams) {
    this._assignToQueryParams(queryParams, this.defaultTag);
    this.setState({ tag: this.defaultTag });
  },

  performQuery(withValue) {
    this.setStateAndPerform( { tag: withValue } );
  },
  
  _assignToQueryParams(queryParams,tag) {
    var tags = new TagString(queryParams[this.paramName]);
    var previousTags = tags.filter(this.tagFilter);
    tags.remove(previousTags);
    tags.add(tag);
    queryParams[this.paramName] = tags.toString();
  },

});

module.exports = QueryParamTagsRotate;

