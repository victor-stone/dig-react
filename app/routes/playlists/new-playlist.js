import qc               from '../../models/query-configs';
import { mergeParams }  from '../../unicorns';
import Playlist         from '../../stores/playlist';
import pages            from '../../components/playlists/pages';

var newPlaylist = pages.NewPlaylist;

newPlaylist.path = '/playlists/new';

newPlaylist.store = function() {
  var opts = mergeParams( { type: 'any' }, qc.remixes, { limit: 10 } );
  var qparams = mergeParams( {}, opts );
  return Playlist.storeFromUploadsQuery(qparams, opts);
};

module.exports = newPlaylist;

