import React     from 'react';

import InstrumentalOnlyFilter  from '../InstrumentalOnlyFilter';
import ArtistFilter            from '../ArtistFilter';
import TagFilter               from '../TagFilter';
import TagsExtra               from '../TagsExtra';
import { LicenseFilter,
         SortFilter,
         OptionsWrap }    from '../QueryOptions';

function PlaylistQueryOptions(props) {

    var store = props.store;

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
          <ArtistFilter store={store} />
        </li>
        <li>
          <TagFilter store={store} />
        </li>
        <li>
          <TagsExtra store={store} />
        </li>
      </OptionsWrap>
    );
}

module.exports = PlaylistQueryOptions;

