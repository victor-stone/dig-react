import Playlist  from '../../stores/playlist';
import pages     from '../../components/playlists/pages';

const Edit = Object.assign(pages.EditDynamicPlaylist,{

  path: '/playlist/browse/:id/edit',
  
  store(params) {
   return Playlist.fromId(params.id).then( store => store.useUnderlyingQuery() );
  },

  browserOnly: true,
  
  urlFromStore(store) {
    const id = store.model.head.id;
    return `/playlist/browse/${id}/edit`;
  }
});

module.exports = Edit;

