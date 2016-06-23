import React        from 'react';
import Playlist     from '../../stores/playlist';
import SubNav       from '../../components/playlists/SubNav';
import pages        from '../../components/playlists/pages';

var playlist = pages.Playlist;
  
playlist.path = '/playlist/browse/:id';

playlist.title = 'Playlist';

playlist.subnav = function(props) {
  var paging = props.store.model.head.isDynamic;
  var store  = paging ? props.store.model.tracks : null;
  return (<SubNav store={store} tab="" paging={paging} />);
};


playlist.store = function(params /*,queryParams */) {
  var id = params.id;
  return Playlist.storeFromQuery(id).then( store => {
    playlist.title = store.model.head.name;
    return store;
  });
};

module.exports = playlist;

//