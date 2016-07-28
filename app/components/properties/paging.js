import React            from 'react';
import PropertyState    from './mixins/property-state';
import Paging           from '../vanilla/paging';
import PagingLimit      from '../filters/paging-limit';
import PagingProperty   from '../../models/properties/paging';


class BoundPaging extends PropertyState(React.Component)
{
  render() {
    return (<Paging stats={this.state.value} onNewOffset={this.updateValue} {...this.props}>
              <PagingLimit store={this.props.store} />
            </Paging>);
  }
}

BoundPaging.defaultProps = {
  Property: PagingProperty
};

module.exports = BoundPaging;


