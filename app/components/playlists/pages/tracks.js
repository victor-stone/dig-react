import React       from 'react';
import Browse      from '../browse';
import TrackHeader from '../track-header';

/*
  Display playlists that include a particular track
*/
function Tracks(props) {
  var store = props.store;
  return (        
    <div className="container-fluid playlist-detail-page">
      <TrackHeader store={store} />
      <Browse store={store} />
    </div>
  );
}

module.exports = Tracks;

//