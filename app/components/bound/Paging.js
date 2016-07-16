import React            from 'react';
import { ModelTracker } from '../../mixins';
import _Paging          from '../vanilla/Paging';
import PagingLimit      from '../filters/PagingLimit';

var emptyStats = {
                offset: 0,
                limit:  0,
                length: 0,
                total:  0
              };    

class Paging extends ModelTracker(React.Component)
{
  constructor() {
    super(...arguments);
    if( !('stats' in this.state) ) {
      this.state = { stats: emptyStats };
    }
    this.onNewOffset = this.onNewOffset.bind(this);
  }

  stateFromStore(store) {
    var model = store.model;
    return { stats: {
                offset: model.queryParams.offset,
                limit:  model.queryParams.limit,
                length: model.items.length,
                total:  model.total
              }
            };
  }

  onNewOffset(offset) {
    this.props.store.paginate(offset);
  }
  
  render() {
    return (<_Paging stats={this.state.stats} onNewOffset={this.onNewOffset} {...this.props}>
              <PagingLimit store={this.props.store} />
            </_Paging>);
  }
}

module.exports = Paging;


