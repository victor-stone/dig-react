import React            from 'react';
import qc               from '../../models/query-configs';
import { mergeParams }  from '../../unicorns';
import Playlist         from '../../stores/playlist';
import NewPlaylist      from '../../components/playlists/NewPlaylist';

function NewPlaylistRoute(props) {
  return <NewPlaylist {...props} />;
}

NewPlaylistRoute.path = '/playlists/new';

NewPlaylistRoute.store = function() {
  var opts = mergeParams( { type: 'any' }, qc.remixes, { limit: 10 } );
  var qparams = mergeParams( {}, opts );
  return Playlist.storeFromUploadsQuery(qparams, opts);
};

module.exports = NewPlaylistRoute;

