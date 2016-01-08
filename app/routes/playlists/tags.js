import React              from 'react';
import Playlists          from '../../stores/playlists';
import { PlaylistWidget } from '../../components/playlists/Browse';


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

tags.path = '/tags/:tags';

tags.title = 'Tags';

tags.store = function(params /*,queryParams */) {
  return Playlists.storeFromQuery( { tags: params.tags, minitems: '0', dynamic: 1 } );
};

module.exports = tags;

//