import React  from 'react';
import Glyph  from '../vanilla/Glyph';
import Link   from '../services/LinkToRoute';
import events from '../../models/events';

import AudioService from '../../services/audio-player';

const PlaylistButton = React.createClass({

  getInitialState: function() {
    return { hasPlaylist: !!AudioService.playlist,
             url: AudioService.playlistURL };
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

  onPlaylist(playlist) {
    this.setState( { hasPlaylist: !!playlist,
                     url: AudioService.playlistURL } );
  },

  render: function() {

    var hasPlaylist = this.state.hasPlaylist;

    return(
        hasPlaylist
          ? (<div className="pull-right hidden-xs hidden-sm">
              <Link href={this.state.url} className="btn btn-sm btn-info" id="playlist-button">
                <Glyph icon="music" />{" now playing"}
              </Link>
            </div>)
          : null     
      );
  }
});

module.exports = global.IS_SERVER_REQUEST ? <span></span> : PlaylistButton;

