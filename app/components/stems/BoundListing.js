import React            from 'react';
import { NoTagHits }    from '../Tags';
import { ModelTracker } from '../../mixins';
import StemsListing from './Listing';
import StemsDetail  from './Detail';

const detailStub = store => class DetailStub extends React.Component {
    render() {
      return <StemsDetail {...this.props} store={store} />;  
    }
};


/*
  Display bound stems browser
  
  props:
    store     - Collection of Upload (e.g. stores/Samples)
    noHitComp - Component to display when a search results 
                in no hits. (Default is NoTagHits)
*/
class BoundStemsListing extends ModelTracker.extender(React.Component)
{
  constructor() {
    super(...arguments);
  }

  stateFromStore(store) {
    const { queryParams:{searchp=''} } = store.model;

    // convert the query's search terms to tags and combine
    // them with query's tags parameter for highlighting

    return { model: store.model, 
             tags: store.tags.add(searchp.replace(/\s/g,',')) };
  }

  render() {
    const { model:{total},  model:{items}, tags } = this.state;
    const { store, noHitsComp } = this.props;

   if( !total ) {
      return noHitsComp ? <noHitsComp store={store} /> : <h2>{"didn't catch that"}</h2>;
    }

    return <StemsListing model={items} tags={tags} css={StemsDetail.css} detailElem={detailStub(store)} />;
  }
}

BoundStemsListing.defaultProps = { noHitsComp: NoTagHits };

module.exports = BoundStemsListing;
