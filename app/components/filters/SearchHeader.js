import React      from 'react';
import PageHeader from '../vanilla/PageHeader';
import Filter     from '../../models/filters/search';

class SearchHeader extends React.Component
{
  constructor() {
    super(...arguments);
    const { store } = this.props;
    this.filter = store.addOrGetFilter(Filter);
    this.onValueChange = this.onValueChange.bind(this);
    this.filter.onChange( this.onValueChange );
    this.state = { text: this.filter.value };
  }

  onValueChange(filter) {
    this.setState( { text: filter.value } );
  }

  render() {
    return <PageHeader icon="search" title={this.state.text} subTitle="Search Results" />;
  }  
}

module.exports = SearchHeader;

//