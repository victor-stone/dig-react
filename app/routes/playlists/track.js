import Playlists from '../../stores/playlists';
import pages     from '../../components/playlists/pages';
import SubNav    from '../../components/playlists/SubNav';

var track = pages.Track;

track.path = '/tracks/:userid/:id';
track.title = 'Track';
track.subnav = SubNav;

track.store = function(params /*,queryParams */) {
  var id = { upload: params.id };
  return Playlists.storeFromQuery(id).then( store => {
    track.title = store.model.upload.name;
    return store;
  });
};

module.exports = track;

//