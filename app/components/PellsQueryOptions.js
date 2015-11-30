import React     from 'react';

import { LicenseFilter,
         QueryOptions,
         LimitFilter,
         OptionsWrap } from './QueryOptions';

import { BPMDisplay,
         BPMSlider }          from './BPM'; 

import { QueryParamTracker,
         DirtyParamTracker }   from '../mixins';

const UnmixedOnlyFilter = React.createClass({

  mixins: [QueryParamTracker, DirtyParamTracker],

  stateFromParams: function(queryParams) {
    var toggle = queryParams.remixmax === '0';
    return { toggle };
  },

  onAreParamsDirty: function(queryParams,defaults,isDirty) {
    if( !isDirty.isDirty) {
      isDirty.isDirty = queryParams.remixmax === '0';
    }
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

function PellsQueryOptionsItems(props) {
  var store = props.store;

  return ( 
    <OptionsWrap >
      <li>
        <LicenseFilter store={store} />
      </li>
      <li>
        <BPMDisplay store={store} />
      </li>
      <li>
        <BPMSlider store={store} />
      </li>
      <li>
        <UnmixedOnlyFilter store={store} />
      </li>
      <li>
        <LimitFilter store={store} />
      </li>
    </OptionsWrap>
  );
}

function PellsQueryOptions(props) {
  return (
        <QueryOptions store={props.store}>
          <PellsQueryOptionsItems store={props.store} />
        </QueryOptions>
      );
}

module.exports = PellsQueryOptions;