import React         from 'react';
import PagingLimit   from '../vanilla/paging-limit';
import Filter        from '../../models/filters/limit';
import PropertyState   from '../properties/mixins/property-state';

class PagingLimitFilter extends PropertyState(React.Component)
{
  render() {
    var cls = this.props.store.model.total > Filter.MIN_LIMIT ? '' : 'hidden';
    return <PagingLimit cls={cls} limit={this.state.value} onLimitChange={this.updateValue} />;
  }

}

PagingLimitFilter.defaultProps = { property: Filter };

module.exports = PagingLimitFilter;


