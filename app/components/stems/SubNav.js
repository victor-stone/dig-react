import React                   from 'react';
import SubNav                  from '../SubNav';
import { SelectedTagSection }  from './Tags';

function StemsSubNav(props) {
  return (
      <SubNav paging store={props.store} >
        <SelectedTagSection store={props.store} />
      </SubNav>
  );
}

module.exports = StemsSubNav;

//
