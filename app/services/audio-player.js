import { LibArray } from '../unicorns';
import Eventer      from '../services/eventer';
import MP3          from './audio-formats/mp3';
import FLAC         from './audio-formats/flac';
import Media        from './audio-formats/media';
import events       from '../models/events';

const NOT_FOUND  = -1;
const FOWARD     = 1;
const BACK       = -1;

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
    this._playlist = null;

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
    return index > NOT_FOUND && index < this._playlist.length - 1;
  }
  
  hasPrev() {
    return this._nowPlayingIndex() > 0;
  }
  
  set playlist(playlist) {
    this._playlist = LibArray.from(playlist);
    this.emit( events.PLAYLIST, playlist);
  }

  get playlist() {
    return this._playlist;
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
    if( this.nowPlaying && this._playlist ) {
      if( !this._playlist.findBy('mediaURL',this.nowPlaying.url ) ) {
        // user hit 'play' on a song not in this playlist
        // nuke it
        this.playlist = null;
      }
    }
  }
  
  _advance(dir) {
    this.play( this._playlist[this._nowPlayingIndex() + dir ] );
  }
  
  _nowPlayingIndex() {
    var index = NOT_FOUND;
    var pl = this._playlist;
    pl && this.nowPlaying && (index = pl.indexOf( pl.findBy('mediaURL',this.nowPlaying.url) ));
    return index;
  }
  
  _onPlay(media) {
    var np = this.nowPlaying;
    np && np !== media && np.stop();
    this.nowPlaying = media;
    this._updatePlaylist();
    media.once('finish',this._onFinish.bind(this));
    this.emit( events.NOW_PLAYING, media );
  }
  
  _onFinish(media) {
    media.stop();
    if( this.hasNext() ) {
      this.playNext();
    }
  }

  attachMedia(playable) {
    return this._media(playable);
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

    let media = null;

    const { mediaURL:url, mediaTags, isFLAC } = playable;

    const { _mediaCache:cache } = this;

    if (cache[url]) {
      media = cache[url];
    } else {  
      var args = Object.assign( { url }, mediaTags );
      media = isFLAC ? new FLAC(args) : new MP3(args);
      media.on('play',this._onPlay.bind(this));
      cache[url] = media;
    }

    playable.media = media;

    return media;
  }
}

module.exports = new AudioPlayer();
