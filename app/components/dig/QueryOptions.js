import React     from 'react';

import   InstrumentalOnlyFilter from '../InstrumentalOnlyFilter';

import { LicenseFilter,
         SortFilter,
         QueryOptions,
         OptionsWrap }    from '../QueryOptions';
         
const _RemixQueryOptions = React.createClass({

  render: function() {
    
    var store = this.props.store;

    return ( 
        <OptionsWrap>
          <li>
            <LicenseFilter ccPlusFilter="ccplus_nostems" store={store} />
          </li>
          <li>
            <SortFilter store={store} />
          </li>
          <li>
            <InstrumentalOnlyFilter store={store} />
          </li>
      </OptionsWrap>
    );
  },
});

function RemixQueryOptions(props) {
  return ( <QueryOptions store={props.store}>
              <_RemixQueryOptions store={props.store} />
          </QueryOptions> );
}

module.exports = RemixQueryOptions;

