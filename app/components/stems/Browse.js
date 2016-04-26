import React        from 'react';
import Listing      from './Listing';
import QueryOptions from './QueryOptions';
import { TagsList } from './Tags';
import InlineCSS    from '../../components/InlineCSS';
import css          from '../../components/stems/style/browse';


function Stems(props) {
    var store = props.store;

    return (
      <div className="stems-browser content-fluid">
        <InlineCSS css={css} id="stems-css" />
        <div className="row stems-browser-widget">
          <div  className="col-md-3">
            <TagsList store={store} />
          </div>
          <div className="col-md-6 stems-listing-widget">
            <Listing   store={store} />   
          </div>
          <div className="col-md-2 stems-fixed-column">
            <QueryOptions store={store} />
          </div>
        </div>
      </div>
    );
}

module.exports = Stems;

