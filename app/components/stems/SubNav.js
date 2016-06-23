import React                   from 'react';
import SubNavBar               from '../bound/SubNavBar';
import { SelectedTagSection }  from './Tags';

function StemsSubNav(props) {
  return (
      <SubNavBar paging store={props.store} >
        <SelectedTagSection store={props.store} />
      </SubNavBar>
  );
}

module.exports = StemsSubNav;

//
