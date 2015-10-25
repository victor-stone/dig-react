/* globals $ */
import React from 'react';
import Glyph from './Glyph';
import Link  from './Link';
import { oassign } from '../unicorns/goodies';

import AudioPlayer from '../services/audioPlayer';

const PlaybackScrubber = React.createClass({


  componentWillReceiveProps: function(props) {
    this.unListen();
  },

  componentWillMount: function() {
    var media = this.props.media;
    media.on('playback',this.onPlayback);
    this.setState( { media } );
  },

  componentWillUnmount: function() {
    this.unListen();
  },

  click: function(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  mouseDown: function() {
    this.setState( { isMouseDown: true } );
  },

  mouseUp: function(evt) {
    this.setState( { isMouseDown: false } );
    this.sendPostion(evt.offsetX);
  },

  mouseMove: function(evt) {
    if( this.state.isMouseDown ) {
      this.sendPostion(evt.offsetX);
    }
  },

  unListen: function() {
    if( this.state.media ) {
      this.state.media.removeListener('playback',this.onPlayback);
    }
  },

  sendPostion: function(offset) {
    var ratio = evt.offsetX / $(this.refs.position).width();
    this.state.media.setPositionPercentage(ratio*100);
  },

  onPlayback: function(media) {
    var state = {
      bytesLoaded: media.bytesLoaded,
      bytesTotal: media.bytesTotal,
      position: media.position,
      duration: media.duration,
    }
    this.setState( )
  },

  loadingWidth: function() {

    var loaded = this.state.state.bytesLoaded;
    var val = 0;
    if( loaded > 0  ) {
      val = 100 * (loaded /  this.state.bytesTotal);
    }
    return val + '';
    
  },

  positionWidth: function() {

    var position = this.state.state.position;
    var val = 0;
    if( position > 0 ) {
      val = 100 * (position / this.state.state.duration);
    }
    return (val + '');      

  },

  render: function() {
    var loadCss = 'width:' + this.loadingWidth() + '%';
    var posCss  = 'width:' + this.positionWidth() + '%';

    return (
        <div onClick={this.click}>
          <div className="waveimage bar"></div>
          <div className='loaded bar'   ref="loading"  style={loadCss}></div>
          <div className='position bar' 
               ref="position" 
               style={posCss}
               onMouseMove={this.onMouseMove}
               onMouseDown={this.onMouseDown}
               onMouseUp={this.onMouseUp}
          </div>
        </div>
      )
  }
});

const PlayControls = React.createClass({

  componentWillMount: function() {
    this.handleNewMedia( this.props.nowPlaying );
  },

  componentWillReceiveProps: function(props) {
    this.handleNewMedia( props.nowPlaying );
  },

  handleNewMedia: function(nowPlaying,opts) {
    var oldMedia = this.state.nowPlaying;
    if( oldMedia != nowPlaying ) {
      if( oldMedia ) {
        oldMedia.removeListener( 'isPaused',   this.onIsPaused );
        oldMedia.removeListener( 'isPlaying',  this.onIsPlaying );
      }
      if( nowPlaying ) {
        nowPlaying.on( 'isPaused',   this.onIsPaused );
        nowPlaying.on( 'isPlaying',  this.onIsPlaying );
      }
    }
    this.setState( oassign{ nowPlaying, opts || {} } );
  },

  isPlaying: function(nowPlaying,isPlaying) {
    this.handleNewMedia( nowPlaying, { isPlaying } );
  },

  isPaused: function(nowPlaying,isPaused) {
    this.handleNewMedia( nowPlaying, { isPaused } );    
  }

  playPrevious: function(e) {
    e.stopPropagation();
    e.preventDefault();
    AudioPlayer.playPrevious();
  },

  togglePause: function(e) {
    e.stopPropagation();
    e.preventDefault();
    AudioPlayer.togglePause();
  },

  playNext: function(e) {
    e.stopPropagation();
    e.preventDefault();
    AudioPlayer.playNext();
  },

  render: function() {

    var prevClass    = 'btn play-previous ' + ( AudioPlayer.hasPrev() ? '' : 'disabled' );
    var nextClass    = 'btn play-next '     + ( AudioPlayer.hasNext() ? '' : 'disabled' );
    var playIcon     = this.state.nowPlaying.isPaused ? 'play' : 'pause';

    return (
      <div className='btn-group pull-left'>
          <a href='#' onClick={this.playPrevious} className={prevClass} >
            <Glyph icon="backward" />
          </a>
          <a href='#' onClick={this.togglePause}  className="btn play"  >
            <Glyph icon={playIcon} />
          </a>
          <a href='#' onClick={this.playNext}     className={nextClass}>
            <Glyph icon="forward" />
          </a>
      </div>
    );
  },

});

const PlaylistButton = React.createClass({

  render: function() {
    return(
        {this.props.playlist
          ? <div className="pull-right">
              <Link href="/nowplaying" className="btn btn-sm btn-info" id="playlist-button">
                <Glyph icon="music" />{" playlist"}
              </Link>
            </div>
          : null
        }
      );
  }
});

const TrackTitleLink = React.createClass({

  render: function() {
    var nowPlaying = this.props.nowPlaying;
    var trackHREF  = '/files/' + nowPlaying.artist.id + '/' + nowPlaying.id;
    return (
      <h4 className='media-heading'><Link href={trackHREF}>{nowPlaying.name}</Link></h4>
    );
  },

});

const ArtistLink = React.createClass({

  render: function() {
    var nowPlaying = this.props.nowPlaying;
    var userHREF   = '/people/' + nowPlaying.artist.id;
    return (
      <Link href={userHREF} className="user"><span class='light-color'>{nowPlaying.artist.name}</span></Link>
    );
  }
});

const AudioPlayer = React.createClass({

  componentWillMount: function() {
    AudioPlayer.on('nowPlaying',this.onNowPlaying);
  },

  onNowPlaying: function(nowPlaying) {
    if( this.state.nowPlaying ) {
      this.nowPlaying.removeListener( 'isPlaying', this.onIsPlaying );
    }
    nowPlaying.on('isPlaying', this.onIsPlaying)
    this.setState( { nowPlaying } );
  },

  onIsPlaying: function(media,isPlaying) {
    this.setState( { media, isPlaying } );
  },

  render: function() {
    var nowPlaying = this.state.nowPlaying;

    if( !nowplaying ) {
      return null;
    }

    var articleClass = 'clearfix audio-player ' + ( nowPlaying.isPlaying ? 'is-playing' : '' );

    return(
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className="container-fluid">
          <article className={articleClass} >
            <PlayControls nowPlaying={nowPlaying} />
            <div className="media-body clearfix">
              <PlaylistButton playlist={AudioPlayer.playlist} />
              <TrackTitleLink nowPlaying={nowPlaying} />
              <ArtistLink nowPlaying={nowPlaying} />
              <PlaybackScrubber media={nowPlaying} />
            </div>
          </article>
        </div>
      </nav>

      );
  },
});

