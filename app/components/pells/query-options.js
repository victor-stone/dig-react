import React     from 'react';

import { License,
         Bpm as BPM,
         UnmixedOnly } from '../filters';

import { QueryOptionsPanel,
         OptionsWrap }        from '../filters/query-options';

// import env from 'services/env';

// env.assert(License          ,'License          ');
// env.assert(BPM              ,'BPM              ');
// env.assert(QueryOptionsPanel,'QueryOptionsPanel');
// env.assert(UnmixedOnly      ,'UnmixedOnly      ');
// env.assert(OptionsWrap      ,'OptionsWrap      ');

function PellsQueryOptions(props) {
  var store = props.store;
  return (
    <QueryOptionsPanel store={props.store} show>
      <OptionsWrap >
        <li>
          <License store={store} />
        </li>
        <li>
          <BPM.Display store={store} />
        </li>
        <li>
          <BPM.Slider store={store} />
        </li>
        <li>
          <UnmixedOnly store={store} />
        </li>
      </OptionsWrap>
    </QueryOptionsPanel>
  );
}

module.exports = PellsQueryOptions;

//