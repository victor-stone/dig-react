import React  from 'react';
import events from 'models/events';

import PlayControls     from './play-controls';
import PlaylistButton   from './playlist-button';
import PlaybackScrubber from './playback-scrubber';
import PlayButton       from './play-button';
import AudioService     from '../../services/audio-player';

import LinkToUpload       from '../services/link-to-upload-route';
import LinkToPeople       from '../services/link-to-people-route';


var nullPosition = { 
  bytesLoaded: -1,
  bytesTotal: -1,
  position: -1,
  duration: -1,
};

const AudioPlayer = React.createClass({

  getInitialState() {
    return { 
      nowPlaying: null,
      controls: {          
        isPlaying: false,
        isPaused: false,
        hasNext: false,
        hasPrev: false,
      },         
      position: Object.assign( {}, nullPosition )
    };
  },

  componentWillMount() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.on( events.NOW_PLAYING ,this.onNowPlaying);
      AudioService.on( events.PLAYLIST,    this.onPlaylist);
    }
  },

  componentWillUnmount() {
    AudioService.removeListener( events.NOW_PLAYING ,this.onNowPlaying);
    AudioService.removeListener( events.PLAYLIST,    this.onPlaylist);
  },

  onNowPlaying(nowPlaying) {
    if( this.state.nowPlaying ) {
      this.state.nowPlaying.removeListener( events.CONTROLS, this.onControls );
      this.state.nowPlaying.removeListener( events.POSITION,  this.onPosition );
    }
    if( nowPlaying ) {
      nowPlaying.on( events.CONTROLS, this.onControls );
      nowPlaying.on( events.POSITION,  this.onPosition );
    }

    this.setState( { nowPlaying } );
  },

  onPlaylist() {
    const { isPaused, isPlaying } = AudioService.nowPlaying || {};
    var controls = {
        isPaused,
        isPlaying,
        hasNext:   AudioService.hasNext(),
        hasPrev:   AudioService.hasPrev()
      };
    this.setState( { controls } );
  },

  onControls(nowPlaying = {}) {
    const { isPaused, isPlaying } = nowPlaying;
    var controls = {
        isPaused,
        isPlaying,
        hasNext:   AudioService.hasNext(),
        hasPrev:   AudioService.hasPrev()
      };
    var state = { controls };
    if( !controls.isPaused && !controls.isPlaying ) {
      state.position = Object.assign( {}, nullPosition );
    }
    this.setState( state );
  },

  onPosition(position) {
    this.setState( { position } );
  },

  render() {

    if( global.IS_SERVER_REQUEST ) {
      return null;
    }

    const { nowPlaying, position, controls } = this.state;
    if( !nowPlaying ) {
      return null;
    }

    var articleClass = 'container-fluid clearfix audio-player ' + ( this.state.isPlaying ? 'is-playing' : '' );

    return(
      <div className={articleClass} >
        <PlayControls controls={controls} />
        <div className="clearfix">
          <PlaylistButton   media={nowPlaying} />
          <PlaybackScrubber media={nowPlaying} position={position} />
          <div className="song-info hidden-xs">
            <LinkToUpload className="upload-link" model={nowPlaying} />
            {" "}
            <LinkToPeople model={nowPlaying.artist} className="user light-color hidden-sm" />
          </div>
        </div>
      </div>
      );
  },
});

AudioPlayer.PlayButton = PlayButton;

module.exports = AudioPlayer;

