import React     from 'react';
import SubNavBar from './SubNavBar';

function PagingNavBar(props)
{
  return (<SubNavBar paging store={props.store} >{" "}</SubNavBar>);
}

module.exports = PagingNavBar;

//