import React         from 'react';
import ListingWidget from './listing-widget';
import QueryOptions from './query-options';
import Tags         from './tags';

import InlineCss    from '../vanilla/inline-css';
import css          from './style/browse';
import Files        from '../models/files';

import { QueryOptionsCSS }     from '../filters/query-options';

import { Row,
         FluidContainer,
         Column }     from '../vanilla/grid';

/*
  BrowseStems (this file)
    |
    |-> ListingWidget
    |       |
    |       |-> BoundListing {StemDetail} ----------------|
    |                  |                                  |
    |                  |-> StemsListing                   |
    |                           |                         |
    |                           |-> StemListing Line      |
    |                                  |                  |
    |                                  |-> {Detail}   <---|
    |-> Tags
          |
          |-> DualTagFieldWidget      


*/
function Stems(props) {
    var store = props.store;

    return (
      <FluidContainer className="stems-browser">
        <InlineCss css={Files.css + QueryOptionsCSS + css} id="stems-css" />
        <Row className="stems-browser-widget">
          <Column cols="3">
            <Tags store={store} />
          </Column>
          <Column cols="7" className="stems-listing-widget">
            <ListingWidget store={store} />   
          </Column>
          <Column cols="2" className="stems-fixed-column">
            <QueryOptions store={store} />
          </Column>
        </Row>
      </FluidContainer>
    );
}

module.exports = Stems;

