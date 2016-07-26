import React                   from 'react';
import SubNavBar               from '../bound/sub-nav-bar';

function StemsSubNav(props) {
  return (
      <SubNavBar paging search store={props.store} >
        <b>{"Select tags to limit results"}</b>
      </SubNavBar>
  );
}

module.exports = StemsSubNav;

//
