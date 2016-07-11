import React                   from 'react';
import Glyph                   from './vanilla/Glyph';
import { TagString,
         bindAll }             from '../unicorns';
import { QueryParamTracker }   from '../mixins';

class TagsExtra extends QueryParamTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.state = { value: (this.props.tags || '').toString() };
    bindAll(this,'onSave', 'onClear', 'onChage');
  }

  stateFromParams(queryParams) {
    if( this.state && this.state.value ) {
      var qptags = new TagString(queryParams.tags);
      return { value: qptags.intersection(this.state.value).toString() };
    }
    return {};
  }

  onSave() {
    var tags    = new TagString(this.state.value);
    var oldtags = this.state.value;
    this.setState( { value: tags.toString() }, () => {
      var store   = this.props.store;
      var qptags  = store.queryParams.tags.replace( oldtags, this.state.value);
      store.refreshModel( { tags: qptags.toString() } );
    });
  }

  onClear() {
    var oldtags = this.state.value;
    this.setState( { value: '' }, () => {
      var store   = this.props.store;
      var qptags  = store.queryParams.tags.remove(oldtags);
      store.refreshModel( { tags: qptags.toString() } );
    });
  }

  onChange(event) {
    this.setState({value: event.target.value} );
  }

  render() {
    return (
      <div className="input-group input-group-sm">
        <input type="text" onChange={this.onChange} value={this.state.value} className="form-control input-sm"  placeholder="extra tags..." />
        <span className="input-group-btn">
          <button type="button" onClick={this.onSave}  className="btn btn-default"><Glyph icon="check" /></button>
          <button type="button" onClick={this.onClear} className="btn btn-default"><Glyph icon="times" /></button>
        </span>
      </div>
      );
  }
}

module.exports = TagsExtra;

//