import React     from 'react';
import qc        from '../../models/query-configs';
import Rmx       from '../../stores/remixes';

import { QueryOptions } from '../../components/dig';

import { DidYouMean,
         Link,
         Glyph,
         Remixes,
         SearchHeader,
         Paging }       from '../../components';
import { mergeParams }  from '../../unicorns';


function NoHits() {
  return (<div className="did-you-mean well no-hit-suggestion">
            {"Not what you're looking for? "}
            <Link href="/dig" className="btn btn-success">
              <Glyph icon="tags" />
              {" tags search"}
            </Link>
          </div>);
}

function search(props) {
  var store = props.store;
  return  (
    <div>
      <SearchHeader store={store} />
      <DidYouMean store={store} artists genres ><NoHits /></DidYouMean>
      <Paging store={store} />
      <Remixes store={store}>
        <QueryOptions store={this.props.store} />
      </Remixes>
      <Remixes.NotALotHere store={store} />
    </div>
  );
}

search.title = 'Search';

search.store = function( params, queryParams ) {

  if( ! ('searchp' in queryParams) ) {
    queryParams.searchp = '';
  }

  var opts    = mergeParams( { search_type: 'all' }, qc.remixes );
  var qparams = mergeParams( {}, opts, queryParams );

  return Rmx.storeFromQuery(qparams,opts);
};

module.exports = search;

