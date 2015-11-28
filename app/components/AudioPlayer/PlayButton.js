import React  from 'react';
import Glyph  from '../Glyph';
import events from '../../models/events';

import AudioService from '../../services/audio-player';

var PlayButton = React.createClass({

  getInitialState: function() {
    if( !global.IS_SERVER_REQUEST ) {
      if( !AudioService.bindToNowPlaying(this.props.model) ) {
        AudioService._media(this.props.model);
      }
    }
    var media     = this.props.model.media;
    var isPlaying = media && media.isPlaying;
    return { isPlaying, media };
  },

  componentWillMount: function() {
    if( this.state.media ) {
      this.state.media.on( events.CONTROLS, this.onControls );
    }
  },

  componentWillUnmount: function() {
    if( this.state.media ) {
      this.state.media.removeListener( events.CONTROLS, this.onControls );
    }
  },

  togglePlay: function(e) {
    e.preventDefault();
    AudioService.togglePlay(this.props.model);
    if( this.props.onPlay ) {
      this.props.onPlay();
    }
  },

  onControls: function(media) {
    this.setState( { isPlaying: media.isPlaying } );
  },

  render: function() {
    var playStop = this.state.isPlaying ? 'stop' : 'play'; 
    var cls      = 'btn btn-info btn-lg';
    var sz       = this.props.big ? 'x4' : '';
    var fixed    = this.props.fixed || false;
    return (<a className={cls} href="#" onClick={this.togglePlay}><Glyph fixed={fixed} sz={sz} icon={playStop} /></a>);
  },

});

module.exports = PlayButton;

