import React            from 'react';
import qc               from '../../models/query-configs';
import Samples          from '../../stores/samples';

import { mergeParams }    from '../../unicorns';

import {  PageHeader }       from '../../components/vanilla';

import Listing               from '../../components/stems/ListingWidget';
import { QueryParamTracker } from '../../mixins';

import { Row,
         FluidContainer,
         Column }     from '../../components/vanilla/Grid';

class SearchHead extends QueryParamTracker(React.Component)
{
  stateFromParams(queryParams) {
    return { searchTerm: queryParams.searchp };
  }

  render() {
    return (<PageHeader icon="search" subTitle="Search" title={this.state.searchTerm}/>);
  }

}

function NoSearchHits() {
  return (<div className="well no-search-hits">{"wups - no matches for that search"}</div>);
}

function stemsSearch(props) {

  var store = props.store;

  return (
    <div>
      <SearchHead store={store} />
      <FluidContainer>
        <div className="stems-browser">
          <Row>
            <Column cols="6" offset="3" className="stems-listing-widget">
              <Listing store={store} noHitsComp={NoSearchHits} />   
            </Column>
          </Row>
        </div>
      </FluidContainer>
    </div>
  );      
}

stemsSearch.title = 'Samples Browser - Search';

stemsSearch.path = '/search';

stemsSearch.store = function(params,queryParams) {
  var qparams = mergeParams( {}, qc.samples, queryParams );
  return Samples.storeFromQuery( qparams, qc.samples );
};

module.exports = stemsSearch;

