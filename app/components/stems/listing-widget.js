import React            from 'react';
import TagNoHits        from '../bound/tag-no-hits';
import StemsDetail      from './detail';

import BoundStemsListing     from '../bound/stems-listing';

function DetailStub(store) {
  return function(props) {
    return <StemsDetail store={store} {...props} />;
  };
}
/*
  Display bound stems browser
  
  props:
    store     - Collection of Upload (e.g. stores/Samples)
    noHitComp - Component to display when a search results 
                in no hits. 
*/
class StemsWidget extends React.Component
{
  render() {
    const { store, noHitsComp, store:{model:{total}} } = this.props;

   if( !total ) {
      return noHitsComp ? <noHitsComp store={store} /> : <h2>{"didn't catch that"}</h2>;
    }

    return <BoundStemsListing store={store} detailElem={DetailStub(store)} />;
  }
}

StemsWidget.defaultProps = { noHitsComp: TagNoHits };

module.exports = StemsWidget;
