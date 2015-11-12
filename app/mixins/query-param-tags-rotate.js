'use strict';
import QueryParamTracker      from './query-param-tracker';
import { oassign, TagString } from '../unicorns';


var QueryParamTagsRotate = oassign( {}, QueryParamTracker, {

  getInitialState: function() {
    if( this.queryParam.avoidInitConflict ) {
      return {};
    }
    var name        = this.queryParam.name;
    var filter      = this.queryParam.filter;
    var qp          = this.props.store.model.queryParams;
    var state       = { tag: TagString.filter(qp[name],filter).toString() };
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
    var name         = this.queryParam.name;
    var filter       = this.queryParam.filter;
    var tags         = new TagString(queryParams[name]);
    var previousTags = tags.filter(filter);
    tags.remove(previousTags);
    tags.add(tag);
    queryParams[name] = tags.toString();
  },

});

module.exports = QueryParamTagsRotate;

