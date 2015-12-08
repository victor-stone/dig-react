import React      from 'react';
import rsvp       from 'rsvp';
import NowPlaying from '../store/nowplaying';

import { PageHeader, 
         DigRemixes as Playlist }     from '../components';

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
  var store = new NowPlaying();
  return rsvp.resolve( store );
};

module.exports = nowplaying;

