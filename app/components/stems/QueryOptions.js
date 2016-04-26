import React     from 'react';

import { LicenseFilter,
         QueryOptionsPanel,
         SortFilter,
         OptionsWrap } from '../QueryOptions';
         
import { BPMDisplay,
         BPMSlider   } from '../BPM'; 

var Options = React.createClass({

  render: function() {

    var store = this.props.store;

    return ( 
      <OptionsWrap>
        <li>
          <LicenseFilter store={store} />
        </li>
        <li>
          <SortFilter store={store} />
        </li>
        <li>
          <BPMDisplay store={store} />
        </li>
        <li>
          <BPMSlider store={store} />
        </li>
      </OptionsWrap>
    );
  },
});
  
function StemsQueryOptions(props)
{
    return (
      <QueryOptionsPanel store={props.store} >
        <Options store={props.store} />
      </QueryOptionsPanel>
    );
}

module.exports = StemsQueryOptions;

//