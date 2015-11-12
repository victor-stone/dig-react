import React     from 'react';
import Glyph     from './Glyph';

import { LicenseFilter,
         LimitFilter,
        /* SortFilter, */
         ResetOptionsButton } from './QueryOptions';
import { BPMDisplay,
         BPMSlider }          from './BPM'; 
import { CloseButton }        from './ActionButtons';


var PellQueryOptions = React.createClass({

  render: function() {

    var hso   = this.props.handleShowOptions;
    var store = this.props.store;

    return ( <ul>
      <li className="btn-primary title" onClick={hso} >
        <Glyph icon="gear" />{" filters"}
        <CloseButton onClick={hso} />
      </li>
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
      <li>
        <ResetOptionsButton store={store} />
      </li>
    </ul>
    );
  },
});
  
module.exports = PellQueryOptions;