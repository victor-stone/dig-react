import React     from 'react';

import { LicenseFilter,
         LimitFilter,
         OptionsWrap } from './QueryOptions';
         
import { BPMDisplay,
         BPMSlider }          from './BPM'; 

var StemsQueryOptions = React.createClass({

  render: function() {

    var store = this.props.store;

    return ( 
      <OptionsWrap>
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
          <LimitFilter store={store} />
        </li>
      </OptionsWrap>
    );
  },
});
  
module.exports = StemsQueryOptions;