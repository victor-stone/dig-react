import React                   from 'react';
import SubNavBar               from '../bound/SubNavBar';

function StemsSubNav(props) {
  return (
      <SubNavBar paging store={props.store} >
        <b>{"this is the tags page"}</b>
      </SubNavBar>
  );
}

module.exports = StemsSubNav;

//
