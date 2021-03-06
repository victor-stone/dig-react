import React       from 'react';
import Filter      from '../../models/filters/match-all';
import TagsFilter  from '../../models/filters/tags';
import Toggle      from './controls/Toggle';

class MatchAllButton extends Toggle
{
  constructor() {
    super(...arguments);
    Object.assign( this.state, this._calcShowState(this.props.store) );
    this.onTagsChanged = this.onTagsChanged.bind(this);
    const tagsFilter = this.props.store.addProperty(TagsFilter);
    tagsFilter.onChange( this.onTagsChanged );
  }

  componentWillReceiveProps(nextProps) {
    this._setIfDifferent(nextProps.store);
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.show !== nextState.show || super.shouldComponentUpdate(...arguments);
  }

  onTagsChanged() {
    this._setIfDifferent(this.props.store);
  }

  _setIfDifferent(store) {
    const { show } = this._calcShowState(store);
    if( show !== this.state.show ) {
      this.setState( {show} );
    }
  }

  _calcShowState(store) {
    const { tags:{length} } = store.nativeProperties;
    return { show: length > 1 };
  }

  render() {
    if( !this.state.show ) {
      return null;
    }
    return super.render();
    /*
    return (  <label className="btn btn-primary btn-xs match-all">
                <input onChange={this.onToggle} checked={this.state.toggle} type="checkbox"/>
                {" match all"}
              </label>
            );
    */
  }
}

MatchAllButton.defaultProps = { filter: Filter, className: 'btn btn-primary btn-xs match-all', text: 'match all' };

module.exports = MatchAllButton;

