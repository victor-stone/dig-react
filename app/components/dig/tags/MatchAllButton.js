import React from 'react';

import { QueryParamTracker } from '../../../mixins';

class MatchAllButton extends QueryParamTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.performQuery = this.performQuery.bind(this);
  }

  stateFromParams(queryParams) {
    return { toggle: queryParams.type === 'all' };
  }

  performQuery() {
    // yes, we reverse it here
    var type = this.state.toggle ? 'any' : 'all';
    this.props.store.refreshModel( { type } );
  }

  render() {
    const { tags:{length} } = this.props.store;
    if( length < 2 ) {
      return null;
    }
    return (  <label className="btn btn-primary btn-xs">
                <input onChange={this.performQuery} checked={this.state.toggle} type="checkbox"/>
                {" match all"}
              </label>
            );
  }
}


module.exports = MatchAllButton;

