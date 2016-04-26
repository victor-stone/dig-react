import React     from 'react';

import { LicenseFilter,
         QueryOptionsPanel,
         OptionsWrap }        from '../QueryOptions';

import UnmixedOnlyFilter      from '../UnmixedOnlyFilter';

import { BPMDisplay,
         BPMSlider }          from '../BPM'; 

function PellsQueryOptions(props) {
  var store = props.store;
  return (
    <QueryOptionsPanel store={props.store} show>
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
    </QueryOptionsPanel>
  );
}

module.exports = PellsQueryOptions;

//