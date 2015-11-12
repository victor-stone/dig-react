import React     from 'react';
import Glyph     from './Glyph';
import qc        from '../models/query-configs';

import { LicenseFilter,
         LimitFilter,
         SortFilter,
         ResetOptionsButton }    from './QueryOptions';
import { CloseButton }           from './ActionButtons';
import { QueryParamTagsToggle }  from '../mixins';

const InstrumentalOnlyFilter = React.createClass({

  mixins: [QueryParamTagsToggle],

  queryParam: {
    name: 'reqtags',
    model: qc.instrumental.reqtags,
  },

  render: function() {
    return (
        <label className="form-control" htmlFor="instrumentalOnly">{"instrumental only "}<input onChange={this.performQuery} checked={this.state.toggle} type="checkbox" id="instrumentalOnly" /></label>
      );
  }
});

const RemixQueryOptions = React.createClass({

  render: function() {
    
    var store = this.props.store;

    return ( <ul>
      <li className="btn-primary title" onClick={this.props.handleShowOptions} >
        <Glyph icon="gear" />{" filters"}
        <CloseButton onClick={this.props.handleShowOptions} />
      </li>
      <li>
        <LicenseFilter store={store} />
      </li>
      <li>
        <SortFilter store={store} />
      </li>
      <li>
        <InstrumentalOnlyFilter store={store} />
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
  
module.exports = RemixQueryOptions;