import { PlaylistTracks } from '../../stores/playlist';
import { mergeParams }    from '../../unicorns';
import qc                 from '../../models/query-configs';
import PagingNavBar       from '../../components/bound/PagingNavBar';
import pages              from '../../components/playlists/pages';

var people = pages.People;

people.path   = '/people/:userid/playlists/tracks';
people.title  = 'People';
people.subnav = PagingNavBar;

people.store  = function(params,queryParams) {
  var defaults = mergeParams( {}, qc.playlistTracks, { user: params.userid } );
  var q = mergeParams( {}, defaults, queryParams );
  return PlaylistTracks.storeFromQuery(q,defaults).then( store => {
    people.title = store.model.artist.name;
    store.model.items.forEach( u => u.count = u.numPlaylists );
    return store;
  });
};

module.exports = people;

//