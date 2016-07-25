import Playlists from '../../stores/playlists';
import pages     from '../../components/playlists/pages';
import SubNav    from '../../components/playlists/sub-nav';

/*
  Display playlists that include a particular track
*/

var track = Object.assign(pages.Tracks,{

  path: '/tracks/:userid/:id',
  title: 'Track',
  subnav: SubNav,

  store(params) {
    const id = { upload: params.id };
    return Playlists.storeFromQuery(id).then( store => {
      track.title = store.model.upload.name;
      return store;
    });
  },

  urlFromStore(store) {
    const { upload:{id,artist} } = store.model; 
    return `/tracks/${artist.id}/${id}`;
  }

});

module.exports = track;

//