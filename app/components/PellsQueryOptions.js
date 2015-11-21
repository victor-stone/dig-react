import React     from 'react';

import { LicenseFilter,
         LimitFilter,
         OptionsWrap } from './QueryOptions';

import { BPMDisplay,
         BPMSlider }          from './BPM'; 

import { QueryParamToggle }   from '../mixins';

const UnmixedOnlyFilter = React.createClass({

  mixins: [QueryParamToggle],

  queryParam: {
    name: 'remixmax',
    valueON: '0',
    valueOFF: undefined
  },

  render: function() {
    return (
        <label className="form-control" htmlFor="unmixed">{"only unmixed "}<input onChange={this.performQuery} checked={this.state.toggle} type="checkbox" id="unmixed" /></label>
      );
  }
});

var PellQueryOptions = React.createClass({

  render: function() {

    var store = this.props.store;

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
  },
});
  
module.exports = PellQueryOptions;