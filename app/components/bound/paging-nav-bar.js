import React     from 'react';
import SubNavBar from './sub-nav-bar';

function PagingNavBar(props)
{
  return (<SubNavBar paging store={props.store} >{" "}</SubNavBar>);
}

module.exports = PagingNavBar;

//