import React                 from 'react';
import _PagingLimit          from '../vanilla/PagingLimit';
import { QueryParamTracker } from '../../mixins';

const MIN_LIMIT = 10;

// TODO: make QueryParamTracker a mixin class
const PaginLimit = React.createClass({ 

  mixins: [QueryParamTracker],

  stateFromParams(queryParams) {
    return { limit: queryParams.limit };
  },

  onLimitChange(limit) {
    this.props.store.refreshModel( { limit } );
  },

  render() {
    var cls = this.props.store.model.total > MIN_LIMIT ? '' : 'hidden';
    return <_PagingLimit cls={cls} limit={this.state.limit} onLimitChange={this.onLimitChange} />;
  }

});


module.exports = PaginLimit;


