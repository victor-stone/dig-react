import React     from 'react';

import { QueryParamTracker }   from '../mixins';

class UnmixedOnlyFilter extends QueryParamTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.performQuery = this.performQuery.bind(this);
  }

  stateFromParams(queryParams) {
    var toggle = queryParams.remixmax === '0';
    return { toggle };
  }

  onAreParamsDirty(queryParams,defaults,isDirty) {
    if( !isDirty.isDirty) {
      isDirty.isDirty = queryParams.remixmax === '0';
    }
  }

  onGetParamsDefault(queryParams) {
    queryParams.remixmax = null;
  }

  performQuery() {
    this.refreshModel( { remixmax: !this.state.toggle ? '0' : '' });
  }

  render() {
    return (
        <label className="form-control" htmlFor="unmixed">{"only unmixed "}<input onChange={this.performQuery} 
                                                                                  checked={this.state.toggle} 
                                                                                  type="checkbox" id="unmixed" 
                                                                           /></label>
      );
  }
}

module.exports = UnmixedOnlyFilter;