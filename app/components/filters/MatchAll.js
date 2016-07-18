import React       from 'react';
import Filter      from '../../models/filters/match-all';
import Toggle      from './controls/Toggle';

class MatchAllButton extends Toggle
{
  constructor() {
    super(...arguments);
    Object.assign( this.state, this._calcShowState(this.props.store) );
  }

  componentWillReceiveProps(nextProps) {
    const { show } = this._calcShowState(nextProps.store);
    if( show !== this.state.show ) {
      this.setState( {show} );
    }
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.show !== nextState.show || super.shouldComponentUpdate(...arguments);
  }

  _calcShowState(store) {
    const { tags:{length} } = store.nativeProperties;
    return { show: length > 1 };
  }

  render() {
    if( !this.state.show ) {
      return null;
    }

    return (  <label className="btn btn-primary btn-xs match-all">
                <input onChange={this.onToggle} checked={this.state.toggle} type="checkbox"/>
                {" match all"}
              </label>
            );
  }
}

MatchAllButton.defaultProps = { filter: Filter };

module.exports = MatchAllButton;

