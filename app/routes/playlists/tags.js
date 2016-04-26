import React              from 'react';
import Playlists          from '../../stores/playlists';
import { PlaylistWidget } from '../../components/playlists/Browse';
import SubNav             from '../../components/playlists/SubNav';
import PageHeader         from '../../components/PageHeader';

function tags(props) {
  var store = props.store;
  return (        
    <div className="container-fluid playlist-tags-page">
      <PageHeader icon="tags" subTitle="tags" title={store.model.queryParams.tags} />
      <PlaylistWidget store={store} />
    </div>
  );
}

tags.path = '/playlists/tags/:tags';

tags.title = 'Tags';

tags.subnav = function(props) {
  return (<SubNav store={props.store} tab="" paging/>);
};

tags.store = function(params /*,queryParams */) {
  return Playlists.storeFromQuery( { tags: params.tags, minitems: '0', dynamic: 1 } );
};

module.exports = tags;

//