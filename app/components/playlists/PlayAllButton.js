import React        from 'react';
import AudioService from '../../services/audio-player';
import Glyph        from '../Glyph';
import Playlists    from '../../stores/playlists';
import events       from '../../models/events';

var PlayAllButton = React.createClass({

  getInitialState: function() {
    return { playlist: this.props.playlist };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.on( events.PLAYLIST, this.onPlaylist);  
      var playlistOn = AudioService.playlistURL === this._playlistURL();
      this.setState( { playlistOn } );
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.removeListener( events.PLAYLIST, this.onPlaylist);      
    }
  },

  onPlaylist: function( pl ) {
    this.stop();
    this.setState( { playlistOn: pl && pl === this.state.tracks } );
  },

  togglePlay: function() {
    if( this.state.playlistOn ) {
      this.stop();
      AudioService.playlist = null;
    } else {
      if( this.state.tracks ) {
        this.setTracks();
      } else {
        var playlists = new Playlists();
        playlists.tracksForPlaylist( this.state.playlist ).then( tracks => {
          this.setState( { tracks }, () => {
            this.setTracks();
          });
        });
      }
    }
  },

  setTracks: function() {
    AudioService.playlistURL = this._playlistURL();
    AudioService.playlist = this.state.tracks;        
    AudioService.play( this.state.tracks[0] );
  },

  stop: function() {
    if( AudioService.nowPlaying ) {
      AudioService.nowPlaying.stop();
    }
  },

  _playlistURL: function() {
    return '/playlist/browse/' + this.state.playlist;
  },

  render: function() {
    var icon    = this.state.playlistOn ? 'stop' : 'play';
    var caption = this.state.playlistOn ? '' : ' play all';
    return(<button className="play-all-button btn btn-sm btn-info" onClick={this.togglePlay}><Glyph icon={icon} />{caption}</button>);
  }
});

module.exports = PlayAllButton;

//