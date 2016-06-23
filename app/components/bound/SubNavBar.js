import React        from 'react';
import _SubNavBar   from '../vanilla/SubNavBar';
import Paging       from './Paging';

function PagingStub(store) {
  return function() {
    return <Paging store={store} />;  
  };  
}

/*
  Display a navbar of tabs. The actual tabs are children 
  of this component (derivations of SubNavTabs)

  props (all optional)
    store     - store bound to paging widget 
    paging    - boolean true means display paging widget in the bar (assumes:
                  store.queryParams { offset, limit }, 
                  store.model.total
                  store.model.items[] )
    className - for the outer div
    css       - override the default css (this is actual css code, 
                not a class selector or reference to a stylesheet
                file)
*/
function SubNavBar(props) {
  var Extra = props.paging && PagingStub(props.store);
  return (
    <_SubNavBar extra={Extra} css={props.css} className={props.className}>
      {props.children}
    </_SubNavBar>
    );
}

module.exports = SubNavBar;
