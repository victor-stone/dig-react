import React             from 'react';
import Playlist          from '../../stores/playlist';
import EditDynamicPlaylist from '../../components/playlists/EditDynamicPlaylist';


function Edit(props) {
  return <EditDynamicPlaylist {...props} />;
}

Edit.path = '/playlist/browse/:id/edit';

Edit.store = function(params) {
  return Playlist.storeFromQuery(params.id).then( store => store.userUnderlyingQuery() );
};

module.exports = Edit;

