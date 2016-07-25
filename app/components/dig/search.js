import React         from 'react';

import QueryOptions  from './query-options';
import Remixes       from './remixes';
import NotALotHere   from './not-a-lot-here';
import DidYouMean    from '../did-you-mean';
import Glyph         from '../vanilla/glyph';
import Link          from '../services/link-to-route';
import SearchHeader  from '../filters/search-header';

function NoHits() {
  return (<div className="did-you-mean well no-hit-suggestion">
            {"Not what you're looking for? "}
            <Link href="/dig" className="btn btn-success">
              <Glyph icon="tags" />
              {" tags search"}
            </Link>
          </div>);
}

function Search(props) {
  var store = props.store;
  return  (
    <div>
      <SearchHeader store={store} />
      <DidYouMean store={store} artists genres ><NoHits /></DidYouMean>
      <Remixes store={store}>
        <QueryOptions store={store} />
      </Remixes>
      <NotALotHere store={store} />
    </div>
  );
}

module.exports = Search;

