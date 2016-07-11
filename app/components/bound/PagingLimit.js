import React                 from 'react';
import PagingLimit           from '../vanilla/PagingLimit';
import { QueryParamTracker } from '../../mixins';

const MIN_LIMIT = 10;

class BoundPagingLimit extends QueryParamTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.onLimitChange = this.onLimitChange.bind(this);
  }
  
  stateFromParams(queryParams) {
    return { limit: queryParams.limit };
  }

  onLimitChange(limit) {
    this.props.store.refreshModel( { limit } );
  }

  render() {
    var cls = this.props.store.model.total > MIN_LIMIT ? '' : 'hidden';
    return <PagingLimit cls={cls} limit={this.state.limit} onLimitChange={this.onLimitChange} />;
  }

}


module.exports = BoundPagingLimit;


