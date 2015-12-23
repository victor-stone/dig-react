import React      from 'react';
import Playlist   from '../../stores/playlist';

import PlaylistPage from '../../components/playlists/Playlist';

function playlist(props) {
  return (<PlaylistPage {...props} />);
}

playlist.path = '/playlist/browse/:id';

playlist.title = 'Playlist';

playlist.store = function(params /*,queryParams */) {
  var id = params.id;
  return Playlist.storeFromQuery(id).then( store => {
    playlist.title = store.model.head.name;
    return store;
  });
};

module.exports = playlist;

//