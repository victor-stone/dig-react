import React            from 'react';

import SearchHeader     from '../filters/SearchHeader';

import Listing          from './ListingWidget';

import { Row,
         FluidContainer,
         Column }     from '../vanilla/Grid';


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

