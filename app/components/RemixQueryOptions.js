import React     from 'react';
import qc        from '../models/query-configs';

import { LicenseFilter,
         LimitFilter,
         SortFilter,
         OptionsWrap }    from './QueryOptions';
         
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

    return ( 
        <OptionsWrap>
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
      </OptionsWrap>
    );
  },
});
  
module.exports = RemixQueryOptions;