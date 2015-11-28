import React  from 'react';
import Glyph  from '../Glyph';
import Link   from '../Link';
import events from '../../models/events';

import AudioService from '../../services/audio-player';

const PlaylistButton = React.createClass({

  getInitialState: function() {
    return { hasPlaylist: !!AudioService.playlist };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.on( events.PLAYLIST, this.onPlaylist);      
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.removeListener( events.PLAYLIST, this.onPlaylist);      
    }
  },

  onPlaylist: function(playlist) {
    this.setState( { hasPlaylist: !!playlist } );
  },

  render: function() {

    var hasPlaylist = this.state.hasPlaylist;

    return(
        hasPlaylist
          ? (<div className="pull-right">
              <Link href="/nowplaying" className="btn btn-sm btn-info" id="playlist-button">
                <Glyph icon="music" />{" playlist"}
              </Link>
            </div>)
          : null     
      );
  }
});

module.exports = PlaylistButton;

