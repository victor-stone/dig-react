import React     from 'react';

import { LicenseFilter,
         QueryOptions,
         OptionsWrap }        from '../QueryOptions';

import UnmixedOnlyFilter      from '../UnmixedOnlyFilter';

import { BPMDisplay,
         BPMSlider }          from '../BPM'; 

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