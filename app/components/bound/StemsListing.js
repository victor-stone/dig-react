import React            from 'react';
import { ModelTracker } from '../../mixins';
import StemsListing     from '../models/StemsListing';

class BoundStemsListing extends ModelTracker(React.Component)
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
    const { model:{items}, tags } = this.state;
    const {detailElem} = this.props;

    return <StemsListing model={items} tags={tags} detailElem={detailElem} />;
  }
}

module.exports = BoundStemsListing;
