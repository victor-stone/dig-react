import React            from 'react';
import Query            from '../../stores/query';
import Blobs            from '../../stores/blobs';
import { Link }         from '../../components/People';
import SubNav           from '../../components/playlists/SubNav';
import css              from '../../components/playlists/style/curators';
import InlineCSS        from '../../components/InlineCSS';

const CURATORS_BLOB = 226312;

function Curators(props) {
  var store = props.store;
  return (
      <ul className="curators-list">
        {store.model.map( c => <li key={c.id}><Link model={c} avatar suburl="playlists" /></li> )}
      </ul>
    );
}

function curatorsPage(props) {
  var store = props.store;
  return (        
    <div className="container-fluid curators-page">
      <InlineCSS css={css} id="curators-css" />
      <Curators store={store} />
    </div>
  );
}

curatorsPage.title = 'Featured Curators';

curatorsPage.subnav = function(props) {
  return (<SubNav store={props.store} tab="curators"/>);
};

curatorsPage.path = '/playlists/curators';

curatorsPage.store = function(/*params,queryParams */) {
  var blobs = new Blobs();
  return blobs.find( CURATORS_BLOB ).then( blob => {
    var ids = blob.text;
    var query = new Query();
    return query.findUsers( { ids } ).then( curators =>{
      query.model = curators;
      return query;
    });
  });
};

module.exports = curatorsPage;

//