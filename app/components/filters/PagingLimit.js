import React                 from 'react';
import PagingLimit           from '../vanilla/PagingLimit';
import Filter                from '../../models/filters/limit';
import { bindAll }           from '../../unicorns';

const MIN_LIMIT = 10;

class PagingLimitFilter extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onLimitChange', 'onValueChange' );
    const { store } = this.props;
    this.filter = store.addProperty(Filter);
    this.filter.onChange( this.onValueChange );
    this.state = { limit: this.filter.value };
  }
  
  onValueChange(filter) {
    this.setState( {limit: filter.value} );
  }

  onLimitChange(limit) {
    this.filter.value = limit;
  }

  render() {
    var cls = this.props.store.model.total > MIN_LIMIT ? '' : 'hidden';
    return <PagingLimit cls={cls} limit={this.state.limit} onLimitChange={this.onLimitChange} />;
  }

}


module.exports = PagingLimitFilter;


