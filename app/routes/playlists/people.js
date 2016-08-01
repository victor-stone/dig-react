import { PlaylistTracks } from '../../stores/playlist';
import { mergeParams }    from 'unicorns';
import qc                 from '../../models/query-configs';
import PagingNavBar       from '../../components/bound/paging-nav-bar';
import pages              from '../../components/playlists/pages';

const people = Object.assign( pages.PeopleFeaturedIn, {

  path: '/people/:userid/playlists/featuredin',

  title: 'People',
  
  subnav: PagingNavBar,

  store( { userid: user }, queryParams ) {

    const q = mergeParams( {}, 
                           qc.playlistTracks, 
                           { user },
                           queryParams );

    return PlaylistTracks.fromQuery(q).then( store => {
    
      people.title = store.model.artist.name;

      // TODO: this shouldn't be here      
      store.model.items.forEach( u => u.count = u.numPlaylists );

      return store;

    });
  },

  urlFromStore(store) {

    const { artist: {id} } = store.model;

    return '/people/' + id + '/playlists/featuredin' + store.queryString( qc.visibility.featuredInPlaylists );
  }
});

module.exports = people;

//