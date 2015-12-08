import React            from 'react';
import qc               from '../../models/query-configs';
import Samples          from '../../stores/samples';

import { mergeParams }    from '../../unicorns';

import {  stems,
          Paging,
          PageHeader }       from '../../components';

import { QueryParamTracker } from '../../mixins';

var SearchHead = React.createClass({

  mixins: [ QueryParamTracker ],

  stateFromParams: function(queryParams) {
    return { searchTerm: queryParams.searchp };
  },

  render: function() {
    return (<PageHeader icon="search" subTitle="Search" title={this.state.searchTerm}/>);
  }

});

function NoSearchHits() {
  return (<div className="well no-search-hits">{"wups - no matches for that search"}</div>);
}
function stemsSearch(props) {

  var store = props.store;

  return (
    <div>
      <SearchHead store={store} />
      <div className="container-fluid">
        <div className="stems-browser">
          <div className="row">
            <div className="col-md-6 stems-listing-widget col-md-offset-3">
              <stems.Listing store={store} noHitsComp={NoSearchHits} />   
            </div>
            <div className="col-md-2">
              <Paging store={store} disableBumping />
            </div>
          </div>
        </div>
      </div>
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

