import React      from 'react';
import PageHeader from './vanilla/PageHeader';

import { QueryParamTracker } from '../mixins';

class SearchHeader extends QueryParamTracker(React.Component)
{
  stateFromParams(queryParams) {
    return { text: queryParams.searchp };
  }

  render() {
    return <PageHeader icon="search" title={this.state.text} subTitle="Search Results" />;
  }  
}

module.exports = SearchHeader;

//