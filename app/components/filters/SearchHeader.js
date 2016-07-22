import React       from 'react';
import PageHeader  from '../vanilla/PageHeader';
import Filter      from '../../models/filters/search';
import PropertyState from '../properties/mixins/PropertyState';

class SearchHeader extends PropertyState(React.Component)
{
  render() {
    return <PageHeader icon="search" title={this.state.value} subTitle="Search Results" />;
  }  
}

SearchHeader.defaultProps = { property: Filter };

module.exports = SearchHeader;

//