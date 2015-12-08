import React     from 'react';
import qc        from '../../models/query-configs';
import Playlist  from '../../stores/playlist';

import { DidYouMean,
         Link,
         Glyph,
         SearchHeader,
         Paging }       from '../../components';
import { mergeParams }  from '../../unicorns';
import { Browse }       from '../../components/dig';


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
      <Browse store={store} />
      <Browse.NotALotHere store={store} />
    </div>
  );
}

search.title = 'Search';

search.store = function( params, queryParams ) {

  var opts    = mergeParams( { search_type: 'all' }, qc.remixes );
  var qparams = mergeParams( {}, opts, queryParams );

  return Playlist.storeFromQuery(qparams,opts);
};

module.exports = search;

