import React        from 'react';
import Playlist     from '../../stores/playlist';
import SubNav       from '../../components/playlists/sub-nav';
import pages        from '../../components/playlists/pages';
import qc           from '../../models/query-configs';

const playlist = Object.assign(pages.Playlist, {

  path: '/playlist/browse/:id',

  title: 'Playlist',

  subnav(props) {
    const { head:{isDynamic:paging}, tracks } = props.store.model;
    return (<SubNav store={paging && tracks} tab="" paging={paging} />);
  },

  store(params) {
    const id = params.id;

    return Playlist.fromId(id).then( store => {
      playlist.title = store.model.head.name;
      return store;
    });
  },

  urlFromStore(store) {
    
    const { head:{id}, tracks } = store.model;
    
    return '/playlist/browse/' + id + tracks.queryString( qc.visibility.remixes );
  }

});
  

module.exports = playlist;

//