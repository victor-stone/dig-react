import React     from 'react';

import { QueryParamTracker,
         DefaultParamTracker,
         DirtyParamTracker }   from '../mixins';

const UnmixedOnlyFilter = React.createClass({

  mixins: [QueryParamTracker, DirtyParamTracker, DefaultParamTracker],

  stateFromParams: function(queryParams) {
    var toggle = queryParams.remixmax === '0';
    return { toggle };
  },

  onAreParamsDirty: function(queryParams,defaults,isDirty) {
    if( !isDirty.isDirty) {
      isDirty.isDirty = queryParams.remixmax === '0';
    }
  },

  onGetParamsDefault: function(queryParams) {
    queryParams.remixmax = null;
  },

  performQuery: function() {
    this.applyHardParams( { remixmax: !this.state.toggle ? '0' : '' });
  },

  render: function() {
    return (
        <label className="form-control" htmlFor="unmixed">{"only unmixed "}<input onChange={this.performQuery} checked={this.state.toggle} type="checkbox" id="unmixed" /></label>
      );
  }
});

module.exports = UnmixedOnlyFilter;