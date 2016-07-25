import React                   from 'react';
import SubNavBar               from '../bound/SubNavBar';

function StemsSubNav(props) {
  return (
      <SubNavBar paging store={props.store} >
        <b>{"Select tags to limit results"}</b>
      </SubNavBar>
  );
}

module.exports = StemsSubNav;

//
