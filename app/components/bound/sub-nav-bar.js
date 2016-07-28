import React        from 'react';
import SubNavBar    from '../vanilla/sub-nav-bar';
import Paging       from './paging';
import SearchBox    from '../filters/search';


function PagingStub(store) {
  return () => <Paging store={store} />;  
}

function SearchStub(store) {
  return () => <SearchBox store={store} parentFadeSelector=".subnav-tabs li" />;
}

/*
  Display a navbar of tabs. The actual tabs are children 
  of this component (derivations of SubNavTabs)

  props (all optional)
    store     - store bound to paging widget 
    paging    - boolean true means display Paging widget in the bar
    search    - boolean true means display SearchBox widget
    className - for the outer div
    css       - override the default css (this is actual css code, 
                not a class selector or reference to a stylesheet
                file)
*/

function BoundSubNavBar(props) {
  const { store, css = '', paging, className, search  } = props;
  const extras = [];
  search && extras.push(SearchStub(store));
  paging && extras.push(PagingStub(store));
  return (
    <SubNavBar extra={extras} css={css + SearchBox.css} className={className}>
      {props.children}
    </SubNavBar>
    );
}

module.exports = BoundSubNavBar;
