import Playlist  from '../../stores/playlist';
import pages     from '../../components/playlists/pages';

var Edit = pages.EditDynamicPlaylist;

Edit.path = '/playlist/browse/:id/edit';

Edit.store = function(params) {
  return Playlist.storeFromQuery(params.id).then( store => store.useUnderlyingQuery() );
};

module.exports = Edit;

