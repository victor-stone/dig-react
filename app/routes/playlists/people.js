import { PlaylistTracks } from '../../stores/playlist';
import { mergeParams }    from '../../unicorns';
import qc                 from '../../models/query-configs';
import PagingNavBar       from '../../components/bound/paging-nav-bar';
import pages              from '../../components/playlists/pages';

const people = Object.assign( pages.PeopleFeaturedIn, {

  path: '/people/:userid/playlists/featuredin',
  title: 'People',
  subnav: PagingNavBar,

  store(params,queryParams) {
    const defaults = mergeParams( {}, qc.playlistTracks, { user: params.userid } );
    const q = mergeParams( {}, defaults, queryParams );
    return PlaylistTracks.storeFromQuery(q,defaults).then( store => {
      people.title = store.model.artist.name;
      store.model.items.forEach( u => u.count = u.numPlaylists );
      return store;
    });
  },

  urlFromStore(store) {
    const { model:{artist:{id}} } = store;
    return `/people/${id}/playlists/featuredin${store.queryString}`;
  }
});

module.exports = people;

//