import qc               from '../../models/query-configs';
import { mergeParams }  from 'unicorns';
import Playlist         from '../../stores/playlist';
import pages            from '../../components/playlists/pages';

const newPlaylist = Object.assign(pages.NewDynamicPlaylist,{

  path: '/playlists/new',

  browserOnly: true,
  
  store() {
    var opts = mergeParams( { type: 'any' }, qc.remixes, { limit: 10 } );
    var qparams = mergeParams( {}, opts );
    return Playlist.storeFromUploadsQuery(qparams, opts);
  }

});


module.exports = newPlaylist;

