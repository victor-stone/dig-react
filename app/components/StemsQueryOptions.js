import React     from 'react';
import Glyph     from './Glyph';

import { LicenseFilter,
         LimitFilter,
        /* SortFilter, */
         ResetOptionsButton } from './QueryOptions';
import { BPMDisplay,
         BPMSlider }          from './BPM'; 
import { CloseButton }        from './ActionButtons';
import { QueryParamToggle }   from '../mixins';

const PopularOnlyFilter = React.createClass({

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

var StemsQueryOptions = React.createClass({

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
        <PopularOnlyFilter store={store} />
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
  
module.exports = StemsQueryOptions;