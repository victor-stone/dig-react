/* global soundManager */
import { oassign,
          debounce } from '../unicorns';
import Eventer from './Eventer';

const NOT_FOUND         = -1;
const EMIT_DELAY        = 50;
const PLAYBACK_DEBOUNCE = 50;
const FOWARD = 1;
const BACK   = -1;

class Media extends Eventer
{
  constructor(args) {
    super();
    oassign(this,args,{
      isPlaying:  false,
      isPaused: false,
      positionProperties: {
        position: -1,
        duration: -1,
        bytesLoaded: -1,
        bytesTotal: -1,
      },      
      _sound: null,
    });
  }


  sound() {
    if( this._sound ) {
      return this._sound;
    }

    var url = this.url;
    if( !url ) {
      return;
    }

    var me = this;
    var sound = soundManager.createSound({
      id:  url,
      url: url,
      onplay() {
        me.setIsPlaying(true);
      },
      onstop() {
        me.setIsPlaying(false);
      },
      onpause() {
        me.setIsPaused(true);
      },
      onresume() {
        me.setIsPaused(false);
      },
      onfinish() {
        me.setIsPlaying(false);
        me.safeEmit('finish',me);
      },

      whileloading: debounce(me.setPositionProperties.bind(me), PLAYBACK_DEBOUNCE),
      whileplaying: debounce(me.setPositionProperties.bind(me), PLAYBACK_DEBOUNCE),
    });

    this._sound = sound;
    return sound;
  }

  setPositionProperties() {
    var sound = this._sound;
    oassign(this.positionProperties,{
          bytesLoaded: sound.bytesLoaded,
          bytesTotal: sound.bytesTotal,
          position: sound.position,
          duration: sound.duration
        });
    this.safeEmit('position',this.positionProperties,this);
  }

  stop() {
    var sound = this.sound();
    if (sound) {
      sound.stop();
    }
  }

  play() {
    var sound = this.sound();
    if (sound) {
      sound.play();
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }
  
  togglePause() {
    var sound = this.sound();
    if( sound ) {
      sound.togglePause();
    }
  }
  
  setPosition(position) {
    return this.sound().setPosition(position);
  }

  setPositionPercentage(percentage) {
    var duration = this.positionProperties.duration;
    return this.setPosition(duration * percentage);
  }

  setIsPlaying(flag) {
    this.isPlaying = flag;
    this.safeEmit( flag ? 'play' : 'stop', this );
    this.safeEmit( 'controls', this );
  }

  setIsPaused(flag) {
    this.isPaused = flag;
    this.safeEmit( 'controls', this );
  }

  safeEmit() {
    // throw the event over to the main window thread
    setTimeout( () => this.emit.apply(this,arguments), EMIT_DELAY );    
  }

}

class AudioPlayer extends Eventer
{
  constructor() {
    super();
    /**
      nowPlaying is an instance of Media - wrapper for underlying implementation
      of sound player.
      
      If whatever you pass to the play() method has a 'mediaTags' hash of bindings
      then those bindings with show up on the nowPlaying object.
    */
    this.nowPlaying = null;
    
    /**
      playlist is an array of models. the .media property may not be
      present on these items.
    */
    this.playlist = null;

    /**
      store this here for now
    */
    this.wantWavImg = false;

    this._mediaCache = {};

  }
  
  play(playable) {
    this._delegate(playable,'play');
  }

  stop(playable) {
    this._delegate(playable,'stop');
  }
    
  togglePlay(playable) {
    this._delegate(playable,'togglePlay');
  }

  togglePause(playable) {
    this._delegate(playable,'togglePause');
  }

  playNext() {
    this._advance(FOWARD);
  }

  playPrevious() {
    this._advance(BACK);
  }

  hasNext() {
    var index = this._nowPlayingIndex();
    return index > NOT_FOUND && index < this.playlist.length - 1;
  }
  
  hasPrev() {
    return this._nowPlayingIndex() > 0;
  }
  
  setPlaylist(playlist) {
    this.playlist = playlist;
    this.emit('playlist', playlist);
  }

  bindToNowPlaying(model) {
    var np = this.nowPlaying;
    if( np && model && model.mediaURL === np.url ) {
      model.media = np;
      return true;
    }
    return false;
  }

  _delegate(playable,method) {
    var media = this._media(playable) || this.nowPlaying;
    if( media ) {
      media[method]();
    }
  }
  
  _updatePlaylist() {
    if( this.nowPlaying && this.playlist ) {
      if( !this.playlist.findBy('mediaURL',this.nowPlaying.url ) ) {
        // user hit 'play' on a song not in this playlist
        // nuke it
        this.playlist = null;
      }
    }
  }
  
  _advance(dir) {
    this.play( this.playlist[this._nowPlayingIndex() + dir ] );
  }
  
  _nowPlayingIndex() {
    var index = NOT_FOUND;
    var pl = this.playlist;
    if( pl && this.nowPlaying ) {
      index = pl.indexOf( pl.findBy('mediaURL',this.nowPlaying.url) );
    }
    return index;
  }
  
  _onPlay(media) {
    var np = this.nowPlaying;
    if( np && np !== media ) {
      np.stop();
    }
    this.nowPlaying = media;
    this._updatePlaylist();
    media.once('finish',this._onFinish.bind(this));
    this.emit('nowPlaying',media);
  }
  
  _onFinish(media) {
    media.stop();
    if( this.hasNext() ) {
      this.playNext();
    }
  }

  _media(playable) {
    
    if( !playable ) {
      return;
    }
    
    if( playable instanceof Media ) {
      return playable;
    }
    
    if( 'media' in playable && playable.media instanceof Media ) {
      return playable.media;
    }

    var media = null;
    var url   = playable.mediaURL;
    var cache = this._mediaCache;

    if (cache[url]) {
      media = cache[url];
    } else {  
      var args = oassign( { url: url },  playable.mediaTags );
      media = new Media(args);
      media.on('play',this._onPlay.bind(this));
      cache[url] = media;
    }

    playable.media = media;

    return media;
  }
}

module.exports = new AudioPlayer();
