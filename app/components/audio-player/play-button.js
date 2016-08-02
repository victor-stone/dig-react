import React    from 'react';
import Glyph    from '../vanilla/glyph';
import DeadLink from '../vanilla/dead-link';
import events   from 'models/events';

import AudioService from 'services/audio-player';

var PlayButton = React.createClass({

  getInitialState() {
    var media = this.bindToModel(this.props.model);
    return this.stateFromMedia(media);
  },

  componentWillMount() {
    this.hookEvents();
  },

  componentWillReceiveProps( nextProps ) {
    var media = nextProps.model.media;
    if( this.state.media ) {
      if( media && this.state.media.url === media.url ) {
        return;
      }
      this.unhookEvents();
    }
    media = this.bindToModel(nextProps.model);
    this.setState( this.stateFromMedia(media), () => this.hookEvents() );
  },

  componentWillUnmount() {
    this.unhookEvents();
  },

  bindToModel(model) {
    if( !AudioService.bindToNowPlaying(model) ) {
      AudioService.attachMedia(model);
    }
    return model.media;
  },

  stateFromMedia(media) {
    var isPlaying = media && media.isPlaying;
    return { isPlaying, media };
  },

  hookEvents() {
    if( this.state.media ) {
      this.state.media.on( events.CONTROLS, this.onControls );
    }
  },

  unhookEvents() {
    if( this.state.media ) {
      this.state.media.removeListener( events.CONTROLS, this.onControls );
    }
  },

  togglePlay() {
    AudioService.togglePlay(this.props.model);
    this.props.onPlay && this.props.onPlay(this.props.model);
  },

  onControls(media) {
    this.setState( { isPlaying: media.isPlaying } );
  },

  render() {
    var playStop = this.state.isPlaying ? 'stop' : 'play'; 
    var btnType  = 'btn-' + (this.props.btnType || 'info');
    var cls      = 'btn ' + btnType + ' btn-lg ' + (this.props.className || '');
    var sz       = this.props.big ? 'x4' : '';
    var fixed    = this.props.fixed || false;
    return (<DeadLink className={cls} onClick={this.togglePlay}><Glyph fixed={fixed} sz={sz} icon={playStop} /></DeadLink>);
  },

});

module.exports = global.IS_SERVER_REQUEST ? () => <span></span> : PlayButton;

