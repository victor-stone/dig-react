import React     from 'react';

import { QueryParamTracker,
         DefaultParamTracker,
         DirtyParamTracker }   from '../mixins';

const UnmixedOnlyFilter = React.createClass({

  mixins: [QueryParamTracker, DirtyParamTracker, DefaultParamTracker],

  stateFromParams(queryParams) {
    var toggle = queryParams.remixmax === '0';
    return { toggle };
  },

  onAreParamsDirty(queryParams,defaults,isDirty) {
    if( !isDirty.isDirty) {
      isDirty.isDirty = queryParams.remixmax === '0';
    }
  },

  onGetParamsDefault(queryParams) {
    queryParams.remixmax = null;
  },

  performQuery: function() {
    this.refreshModel( { remixmax: !this.state.toggle ? '0' : '' });
  },

  render: function() {
    return (
        <label className="form-control" htmlFor="unmixed">{"only unmixed "}<input onChange={this.performQuery} checked={this.state.toggle} type="checkbox" id="unmixed" /></label>
      );
  }
});

module.exports = UnmixedOnlyFilter;