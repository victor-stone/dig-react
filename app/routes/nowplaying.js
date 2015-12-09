import React      from 'react';
import rsvp       from 'rsvp';
import NowPlaying from '../stores/nowplaying';

import { PageHeader } from '../components';
import { Browse }     from '../components/dig';


var nowplaying = React.createClass({

  render() {
    var store  = this.props.store;

    return  (
      <div>
        <PageHeader icon="music" title={nowplaying.title} />
        <Browse store={store} />
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

