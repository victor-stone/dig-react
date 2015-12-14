import React      from 'react';
import Playlist   from '../../stores/playlist';
import PageHeader from '../../components/PageHeader';
import Info       from '../../components/playlists/Info';
import Tracks     from '../../components/playlists/Tracks';

var PlaylistPage = React.createClass({

  render: function() {
    var store = this.props.store;
    var model = store.model;

    return (
        <div className="container-fluid playlist-detail-page">
          <PageHeader icon="music" title={model.head.name} subTitle="playlist" />
          <div className="row">
            <div className="col-md-3 col-md-offset-1">
              <Info store={store} />
            </div>
            <div className="col-md-6">
              <Tracks store={model.tracks} />
            </div>
          </div>
        </div>
      );
  }
});

function playlist(props) {
  return (<PlaylistPage {...props} />);
}

playlist.path = '/playlist/browse/:id';

playlist.title = 'Playlist';

playlist.store = function(params /*,queryParams */) {
  var id = params.id;
  return Playlist.storeFromQuery(id).then( store => {
    playlist.title = store.model.head.name;
    return store;
  });
};

module.exports = playlist;

//