import React         from 'react';

import QueryOptions  from './QueryOptions';
import Remixes       from './Remixes';
import NotALotHere   from './NotALotHere';
import DidYouMean    from '../DidYouMean';
import Glyph         from '../vanilla/Glyph';
import Link          from '../services/LinkToRoute';
import SearchHeader  from '../filters/SearchHeader';

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

