import React                   from 'react';
import Glyph                   from './Glyph';
import { TagString }           from '../unicorns';
import { QueryParamTracker }   from '../mixins';

var TagsExtra = React.createClass({

  mixins: [QueryParamTracker],

  getInitialState: function() {
    return { value: (this.props.tags || '').toString() };
  },

  stateFromParams: function(queryParams) {
    if( this.state && this.state.value ) {
      var qptags = new TagString(queryParams.tags);
      return { value: qptags.intersection(this.state.value).toString() };
    }
    return {};
  },

  onSave: function() {
    var tags    = new TagString(this.state.value);
    var oldtags = this.state.value;
    this.setState( { value: tags.toString() }, () => {
      var store   = this.props.store;
      var qptags  = store.queryParams.tags.replace( oldtags, this.state.value);
      store.applyHardParams( { tags: qptags.toString() } );
    });
  },

  onClear: function() {
    var oldtags = this.state.value;
    this.setState( { value: '' }, () => {
      var store   = this.props.store;
      var qptags  = store.queryParams.tags.remove(oldtags);
      store.applyHardParams( { tags: qptags.toString() } );
    });
  },

  handleChange: function(event) {
    this.setState({value: event.target.value} );
  },

  render: function() {

    return (
      <div className="input-group input-group-sm">
        <input type="text" onChange={this.handleChange} value={this.state.value} className="form-control input-sm"  placeholder="extra tags..." />
        <span className="input-group-btn">
          <button type="button" onClick={this.onSave}  className="btn btn-default"><Glyph icon="check" /></button>
          <button type="button" onClick={this.onClear} className="btn btn-default"><Glyph icon="times" /></button>
        </span>
      </div>
      );
  }
});

module.exports = TagsExtra;

//