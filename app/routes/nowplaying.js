import React      from 'react';
import rsvp       from 'rsvp';
import NowPlaying from '../stores/nowplaying';

import { PageHeader,
         Remixes } from '../components';

// FIXME: now playing from audio player is broken

var nowplaying = React.createClass({

  render() {
    var store  = this.props.store;

    return  (
      <div>
        <PageHeader icon="music" title={nowplaying.title} />
        <Remixes store={store} />
      </div>
    );
  },

});

nowplaying.title = 'Now Playing';

nowplaying.store = function( /*params,queryParams*/ ) {
  var store = new NowPlaying();
  return rsvp.resolve( store );
};

module.exports = nowplaying;

