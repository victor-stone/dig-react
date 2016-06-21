import React  from 'react';
import People from '../People';
import events from '../../models/events';

import { oassign } from '../../unicorns';

import PlayControls     from './PlayControls';
import PlaylistButton   from './PlaylistButton';
import PlaybackScrubber from './PlaybackScrubber';
import PlayButton       from './PlayButton';
import AudioService     from '../../services/audio-player';

import UploadLink       from '../services/LinkToUploadRoute';

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
      position: oassign( {}, nullPosition )
    };
  },

  componentWillMount() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.on( events.NOW_PLAYING ,this.onNowPlaying);
      AudioService.on( events.PLAYLIST,    this.onPlaylist);
    }
  },

  componentWillUnmount() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.removeListener( events.NOW_PLAYING ,this.onNowPlaying);
      AudioService.removeListener( events.PLAYLIST,    this.onPlaylist);
    }
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
    var np = AudioService.nowPlaying;
    var controls = {
        isPaused:  np.isPaused,
        isPlaying: np.isPlaying,
        hasNext:   AudioService.hasNext(),
        hasPrev:   AudioService.hasPrev()
      };
    this.setState( { controls } );
  },

  onControls(nowPlaying) {
    var controls = {
        isPaused:  nowPlaying.isPaused,
        isPlaying: nowPlaying.isPlaying,
        hasNext:   AudioService.hasNext(),
        hasPrev:   AudioService.hasPrev()
      };
    var state = { controls };
    if( !controls.isPaused && !controls.isPlaying ) {
      state.position = oassign( {}, nullPosition );
    }
    this.setState( state );
  },

  onPosition(position) {
    this.setState( { position } );
  },

  render() {
    if( !this.state.nowPlaying ) {
      return null;
    }
    var nowPlaying = this.state.nowPlaying;
    var position   = this.state.position;
    var controls   = this.state.controls;

    var articleClass = 'container-fluid clearfix audio-player ' + ( this.state.isPlaying ? 'is-playing' : '' );

    return(
      <div className={articleClass} >
        <PlayControls controls={controls} />
        <div className="clearfix">
          <PlaylistButton   media={nowPlaying} />
          <PlaybackScrubber media={nowPlaying} position={position} />
          <div className="song-info hidden-xs">
            <UploadLink className="upload-link" model={nowPlaying} />
            {" "}
            <People.Link model={nowPlaying.artist} className="user light-color hidden-sm" />
          </div>
        </div>
      </div>
      );
  },
});

AudioPlayer.PlayButton = PlayButton;

module.exports = AudioPlayer;

