'use strict';

import React            from 'react';
import rsvp             from 'rsvp';
import { PageHeader, 
         Playlist }     from '../components';

import AudioPlayerService from '../services/audioPlayer';

class NowPlayingStore {

  constructor() {
    var pl = AudioPlayerService.playlist || [];
    this.model = {
      playlist: pl,
      total: pl.length
    };
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

