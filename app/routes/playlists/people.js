import React              from 'react';
import Playlists          from '../../stores/playlists';
import { PlaylistWidget } from '../../components/playlists/Browse';


import { Header }        from '../../components/People';

function curator(props) {
  var store = props.store;
  return (        
    <div className="container-fluid curator-detail-page">
      <Header model={store.model.curator} />
    <PlaylistWidget store={store} skipUser />
    </div>
  );
}

curator.path = '/people/:userid';

curator.title = 'People';

curator.store = function(params /*,queryParams */) {
  var id = { user: params.userid };
  return Playlists.storeFromQuery(id).then( store => {
    curator.title = store.model.curator.name;
    return store;
  });
};

module.exports = curator;

//