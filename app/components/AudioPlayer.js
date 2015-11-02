/* globals $ */
import React from 'react';
import Glyph from './Glyph';
import Link  from './Link';

import AudioPlayerService from '../services/audioPlayer';

const PlaybackScrubber = React.createClass({

  getInitialState: function() {
    return {
        position: this.props.position
      };
  },

  click: function(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  _isMouseDown: false,

  mouseDown: function() {
    this._isMouseDown = true;
  },

  mouseUp: function(evt) {
    this._isMouseDown = false;
    this.sendPostion(evt.clientX);
  },

  mouseMove: function(evt) {
    if( this._isMouseDown ) {
      this.sendPostion(evt.clientX);
    }
  },

  sendPostion: function(offset) {
    var $e = $(this.refs['container']);
    var width = $e.width();
    offset -= $e.position().left;
    var ratio = offset / width;
    this.props.media.setPositionPercentage(ratio);
  },

  loadingWidth: function() {

    var loaded = this.state.position.bytesLoaded;
    var val = 0;
    if( loaded > 0  ) {
      val = 100 * (loaded /  this.state.position.bytesTotal);
    }
    return val + '';
    
  },

  positionWidth: function() {

    var position = this.state.position.position;
    var val = 0;
    if( position > 0 ) {
      val = 100 * (position / this.state.position.duration);
    }
    return (val + '');      

  },

  render: function() {
    var loadCss = { width: this.loadingWidth() + '%' };
    var posCss  = { width: this.positionWidth() + '%' };

    return (
        <div onClick={this.click} ref="container" className="playback-scrubber pull-left">
          <div className="waveimage bar" />
          <div className="loaded bar"   
               ref="loading"  
               style={loadCss} 
               onMouseMove={this.mouseMove}
               onMouseDown={this.mouseDown}
               onMouseUp={this.mouseUp}          
          />
          <div className="position bar"
               ref="position" 
               style={posCss}               
               onMouseMove={this.mouseMove}
               onMouseDown={this.mouseDown}
               onMouseUp={this.mouseUp}          
          />
        </div>
      );
  }
});

const PlayControls = React.createClass({

  getInitialState: function() {
    return this.props.controls;
  },

  playPrevious: function(e) {
    e.stopPropagation();
    e.preventDefault();
    AudioPlayerService.playPrevious();
  },

  togglePause: function(e) {
    e.stopPropagation();
    e.preventDefault();
    AudioPlayerService.togglePause();
  },

  playNext: function(e) {
    e.stopPropagation();
    e.preventDefault();
    AudioPlayerService.playNext();
  },

  render: function() {

    var prevClass    = 'btn play-previous ' + ( this.state.hasPrev ? '' : 'disabled' );
    var nextClass    = 'btn play-next '     + ( this.state.hasNext ? '' : 'disabled' );
    var playIcon     = (this.state.isPlaying && !this.state.isPaused) ? 'pause' : 'play';

    return (
      <div className="btn-group pull-left">
          <a href="#" onClick={this.playPrevious} className={prevClass} >
            <Glyph icon="backward" />
          </a>
          <a href="#" onClick={this.togglePause}  className="btn play"  >
            <Glyph icon={playIcon} />
          </a>
          <a href="#" onClick={this.playNext}     className={nextClass}>
            <Glyph icon="forward" />
          </a>
      </div>
    );
  },

});

const PlaylistButton = React.createClass({

  getInitialState: function() {
    return { hasPlaylist: !!AudioPlayerService.playlist };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioPlayerService.on('playlist',this.onPlaylist);      
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioPlayerService.removeListener('playlist',this.onPlaylist);      
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

const TrackTitleLink = React.createClass({

  getInitialState: function() {
    return this.props;
  },

  render: function() {
    if( !this.state.name ) {
      return null;
    }
    var trackHREF  = '/files/' + this.state.artistID + '/' + this.state.id;
    return (
      <h4 className="media-heading"><Link href={trackHREF}>{this.state.name}</Link></h4>
    );
  },

});

const ArtistLink = React.createClass({

  getInitialState: function() {
    return this.props;
  },

  render: function() {
    if( !this.state.id ) {
      return null;
    }
    var userHREF   = '/people/' + this.state.id;
    return (
      <Link href={userHREF} className="user"><span className="light-color">{this.state.name}</span></Link>
    );
  }
});

const AudioPlayer = React.createClass({

  getInitialState: function() {
    return { nowPlaying: null,
             isPlaying: false,
             isPaused: false,
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
      AudioPlayerService.on('nowPlaying',this.onNowPlaying);
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioPlayerService.removeListener('nowPlaying',this.onNowPlaying);
    }
  },

  onNowPlaying: function(nowPlaying) {
    if( this.state.nowPlaying ) {
      this.state.nowPlaying.removeListener( 'controls', this.onControls );
      this.state.nowPlaying.removeListener( 'position',  this.onPosition );
    }
    if( nowPlaying ) {
      nowPlaying.on( 'controls', this.onControls );
      nowPlaying.on( 'position',  this.onPosition );

      this.setRefsStates(nowPlaying);
      this.updateControlsStates(nowPlaying);

    } else {
      this.setState( { nowPlaying } );
    }
  },

  setRefsStates: function( nowPlaying ) {
    if( this.refs && 'artist' in this.refs ) {
      this.refs['artist'].setState( {
        id: nowPlaying.artist.id,
        name: nowPlaying.artist.name
      });

      this.refs['trackTitle'].setState( {
        artistID: nowPlaying.artist.id,
        id: nowPlaying.id,
        name: nowPlaying.name
      });

    }
  },

  getControlsState: function(nowPlaying) {
    return {
        isPaused: nowPlaying.isPaused,
        isPlaying: nowPlaying.isPlaying,
        hasNext: AudioPlayerService.hasNext(),
        hasPrev: AudioPlayerService.hasPrev()
      };
  },

  updateControlsStates: function(nowPlaying) {
    if( this.refs && 'controls' in this.refs ) {
      this.refs['controls'].setState( this.getControlsState(nowPlaying) );
    }

    this.setState( 
        { nowPlaying,
          isPaused: nowPlaying.isPaused,
          isPlaying: nowPlaying.isPlaying
        } );
  },

  onControls: function(nowPlaying) {
    this.updateControlsStates(nowPlaying);
  },

  onPosition: function(position) {
    this.refs['scrubber'].setState( { position } );
    this.setState( { position } );
  },

  render: function() {
    if( !this.state.nowPlaying ) {
      return null;
    }
    var nowPlaying   = this.state.nowPlaying;
    var artist       = nowPlaying.artist;
    var position     = this.state.position;
    var articleClass = 'clearfix audio-player ' + ( this.state.isPlaying ? 'is-playing' : '' );
    var controlState = this.getControlsState(nowPlaying);

    return(
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className="container-fluid">
          <article className={articleClass} >
            <PlayControls ref="controls" controls={controlState} />
            <div className="media-body clearfix">
              <PlaylistButton   media={nowPlaying} />
              <PlaybackScrubber ref="scrubber" media={nowPlaying} position={position} />
              <TrackTitleLink   ref="trackTitle"  artistID={artist.id} id={nowPlaying.id} name={nowPlaying.name} />
              {" "}
              <ArtistLink       ref="artist"  id={artist.id} name={artist.name} />
            </div>
          </article>
        </div>
      </nav>

      );
  },
});

AudioPlayer.PlayButton = React.createClass({

  getInitialState: function() {
    if( !global.IS_SERVER_REQUEST ) {
      if( !AudioPlayerService.bindToNowPlaying(this.props.model) ) {
        AudioPlayerService._media(this.props.model);
      }
    }
    var media     = this.props.model.media;
    var isPlaying = media && media.isPlaying;
    return { isPlaying, media };
  },

  componentWillMount: function() {
    if( this.state.media ) {
      this.state.media.on( 'controls', this.onControls );
    }
  },

  componentWillUnmount: function() {
    if( this.state.media ) {
      this.state.media.removeListener( 'controls', this.onControls );
    }
  },

  togglePlay: function(e) {
    e.preventDefault();
    AudioPlayerService.togglePlay(this.props.model);
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

module.exports = AudioPlayer;

