import React    from 'react';
import Query    from '../../stores/query-basic';
import Blobs    from '../../stores/blobs';
import SubNav   from '../../components/playlists/SubNav';
import pages    from '../../components/playlists/pages';

const CURATORS_BLOB = 226312;

var curators = pages.Curators;

curators.title = 'Featured Curators';

curators.subnav = function(props) {
  return (<SubNav store={props.store} tab="curators"/>);
};

curators.path = '/playlists/curators';

curators.store = function(/*params,queryParams */) {
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

module.exports = curators;

//