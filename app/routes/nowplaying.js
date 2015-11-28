import React            from 'react';
import rsvp             from 'rsvp';
import { PageHeader, 
         DigRemixes as Playlist }     from '../components';

import AudioPlayerService from '../services/audio-player';

class NowPlayingStore {

  constructor() {
    var pl = AudioPlayerService.playlist || [];
    this.model = {
      playlist: pl,
      total: pl.length
    };
  }

  supportsOptions() {
    return false;
  }
  
  on() {}
  removeListener() {}

}


var nowplaying = React.createClass({

  render() {
    var store  = this.props.store;

    return  (
      <div>
        <PageHeader icon="music" title={nowplaying.title} />
        <Playlist store={store} />
      </div>
    );
  },

});

nowplaying.title = 'Now Playing';

nowplaying.store = function( /*params,queryParams*/ ) {
  var store = new NowPlayingStore();
  return rsvp.resolve( store );
};

module.exports = nowplaying;

