import React       from 'react';
import Filter      from '../../models/filters/match-all';
import Toggle      from './controls/Toggle';

class MatchAllButton extends Toggle
{
  render() {
    const { tags:{length} } = this.props.store;
    if( length < 2 ) {
      return null;
    }
    return (  <label className="btn btn-primary btn-xs match-all">
                <input onChange={this.performQuery} checked={this.state.toggle} type="checkbox"/>
                {" match all"}
              </label>
            );
  }
}

MatchAllButton.defaultProps = { filter: Filter };

module.exports = MatchAllButton;

