import React         from 'react';
import ListingWidget from './ListingWidget';
import QueryOptions from './QueryOptions';
import Tags         from './Tags';

import InlineCSS    from '../vanilla/InlineCSS';
import css          from './style/browse';
import Files        from '../models/Files';

import { Row,
         FluidContainer,
         Column }     from '../vanilla/Grid';

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
        <InlineCSS css={css+Files.css} id="stems-css" />
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

