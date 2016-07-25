import React            from 'react';

import SearchHeader     from '../filters/search-header';

import Listing          from './listing-widget';

import { Row,
         FluidContainer,
         Column }     from '../vanilla/grid';


function NoSearchHits() {
  return (<div className="well no-search-hits">{"wups - no matches for that search"}</div>);
}

function Serach(props) {

  var store = props.store;

  return (
    <div>
      <SearchHeader store={store} />
      <FluidContainer>
        <div className="stems-browser">
          <Row>
            <Column cols="6" offset="3" className="stems-listing-widget">
              <Listing store={store} noHitsComp={NoSearchHits} />   
            </Column>
          </Row>
        </div>
      </FluidContainer>
    </div>
  );      
}

module.exports = Serach;

