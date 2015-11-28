import React  from 'react';
import People from '../People';
import AB     from '../ActionButtons';
import events from '../../models/events';

import PlayControls     from './PlayControls';
import PlaylistButton   from './PlaylistButton';
import PlaybackScrubber from './PlaybackScrubber';
import PlayButton       from './PlayButton';
import AudioService     from '../../services/audio-player';

var UploadLink = AB.UploadLink;

const AudioPlayer = React.createClass({

  getInitialState: function() {
    return { 
      nowPlaying: null,
      controls: {          
        isPlaying: false,
        isPaused: false,
        hasNext: false,
        hasPrev: false,
      },         
      position: { 
        bytesLoaded: -1,
        bytesTotal: -1,
        position: -1,
        duration: -1,
      }              
    };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.on( events.NOW_PLAYING ,this.onNowPlaying);
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.removeListener( events.NOW_PLAYING ,this.onNowPlaying);
    }
  },

  onNowPlaying: function(nowPlaying) {
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

  onControls: function(nowPlaying) {
    var controls = {
        isPaused:  nowPlaying.isPaused,
        isPlaying: nowPlaying.isPlaying,
        hasNext:   AudioService.hasNext(),
        hasPrev:   AudioService.hasPrev()
      };
    this.setState( { controls } );
  },

  onPosition: function(position) {
    this.setState( { position } );
  },

  render: function() {
    if( !this.state.nowPlaying ) {
      return null;
    }
    var nowPlaying = this.state.nowPlaying;
    var position   = this.state.position;
    var controls   = this.state.controls;

    var articleClass = 'clearfix audio-player ' + ( this.state.isPlaying ? 'is-playing' : '' );

    return(
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className="container-fluid">
          <article className={articleClass} >
            <PlayControls ref="controls" controls={controls} />
            <div className="media-body clearfix">
              <PlaylistButton   media={nowPlaying} />
              <PlaybackScrubber media={nowPlaying} position={position} />
              <UploadLink model={nowPlaying} />
              {" "}
              <People.Link model={nowPlaying.artist} className="user light-color" />
            </div>
          </article>
        </div>
      </nav>

      );
  },
});

AudioPlayer.PlayButton = PlayButton;

module.exports = AudioPlayer;

