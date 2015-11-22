import React     from 'react';

import { LicenseFilter,
         LimitFilter,
         QueryOptions,
         OptionsWrap } from './QueryOptions';
         
import { BPMDisplay,
         BPMSlider   } from './BPM'; 

var _StemsQueryOptions = React.createClass({

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
  
function StemsQueryOptions(props) {
  return (<QueryOptions store={props.store}>
            <_StemsQueryOptions store={props.store} />
          </QueryOptions>);
}

module.exports = StemsQueryOptions;