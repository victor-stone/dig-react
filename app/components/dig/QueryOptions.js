import React     from 'react';

import { License,
         Sort,
         InstrumentalOnly } from '../filters';

import { QueryOptions,
         OptionsWrap }    from '../filters/QueryOptions';
         

class RemixQueryOptions extends React.Component
{

  render() {  

    const { store } = this.props;

    return ( 
      <QueryOptions store={store}>
        <OptionsWrap>
          <li><License ccPlusFilter="ccplus_nostems" store={store} /></li>
          <li><Sort store={store} /></li>
          <li><InstrumentalOnly store={store} /></li>
        </OptionsWrap>
      </QueryOptions> 
    );
  }

}

module.exports = RemixQueryOptions;

