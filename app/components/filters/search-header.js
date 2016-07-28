import React       from 'react';
import PageHeader  from '../vanilla/page-header';
import Filter      from '../../models/filters/search';
import PropertyState from '../properties/mixins/property-state';

class SearchHeader extends PropertyState(React.Component)
{
  render() {
    return <PageHeader icon="search" title={this.state.value} subTitle="Search Results" />;
  }  
}

SearchHeader.defaultProps = { property: Filter };

module.exports = SearchHeader;

//