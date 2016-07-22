import React     from 'react';

import { DualTagFieldWidget }   from '../bound/Tags';

import { UploadType,
         License,
         Sort,
         InstrumentalOnly,
         People,
         AdminTag }    from '../filters';

import { OptionsWrap } from '../filters/QueryOptions';

function PlaylistQueryOptions(props) {

    var store = props.store;

    return ( 
      <OptionsWrap>
        <li>
          <UploadType store={store} id="typelist"/>
        </li>
        <li>
          <License store={store} />
        </li>
        <li>
          <Sort store={store} />
        </li>
        <li>
          <InstrumentalOnly store={store} className="btn btn-info" />
        </li>
        <li>
          <People store={store} />
        </li>
        <li>
          <DualTagFieldWidget store={store} withMatchAll />
        </li>
        <li>
          <AdminTag store={store} />
        </li>
      </OptionsWrap>
    );
}

module.exports = PlaylistQueryOptions;

