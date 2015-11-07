/* global soundManager */
import { EventEmitter } from 'events';
import { oassign,
          debounce } from '../unicorns';
import util from 'util';


function Media(args) {
  if( !(this instanceof Media) ) {
    return new Media(args);
  }
  EventEmitter.call(this);
  oassign(this,args);
}

util.inherits(Media,EventEmitter);

oassign(Media.prototype,{

  isPlaying:  false,
  isPaused: false,
  positionProperties: {
    position: -1,
    duration: -1,
    bytesLoaded: -1,
    bytesTotal: -1,
  },
  
  _sound: null,

  sound: function() {
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
      onplay: function() {
        me.setIsPlaying(true);
      },
      onstop: function() {
        me.setIsPlaying(false);
      },
      onpause: function() {
        me.setIsPaused(true);
      },
      onresume: function() {
        me.setIsPaused(false);
      },
      onfinish: function() {
        me.setIsPlaying(false);
        me.safeEmit('finish',me);
      },

      whileloading: debounce(me.setPositionProperties.bind(me), 50),
      whileplaying: debounce(me.setPositionProperties.bind(me), 50),
    });

    this._sound = sound;
    return sound;
  },

  setPositionProperties: function() {
    var sound = this._sound;
    oassign(this.positionProperties,{
          bytesLoaded: sound.bytesLoaded,
          bytesTotal: sound.bytesTotal,
          position: sound.position,
          duration: sound.duration
        });
    this.safeEmit('position',this.positionProperties,this);
  },

  stop: function() {
    var sound = this.sound();
    if (sound) {
      sound.stop();
    }
  },

  play: function() {
    var sound = this.sound();
    if (sound) {
      sound.play();
    }
  },

  togglePlay: function() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  },
  
  togglePause: function() {
    var sound = this.sound();
    if( sound ) {
      sound.togglePause();
    }
  },
  
  setPosition: function(position) {
    return this.sound().setPosition(position);
  },

  setPositionPercentage: function(percentage) {
    var duration = this.positionProperties.duration;
    return this.setPosition(duration * percentage);
  },

  setIsPlaying: function(flag) {
    this.isPlaying = flag;
    this.safeEmit( flag ? 'play' : 'stop', this );
    this.safeEmit( 'controls', this );
  },

  setIsPaused: function(flag) {
    this.isPaused = flag;
    this.safeEmit( 'controls', this );
  },

  safeEmit: function() {
    // throw the event over to the main window thread
    setTimeout( () => this.emit.apply(this,arguments), 50 );    
  }

});

function AudioPlayer() {
  if( !(this instanceof AudioPlayer) ) {
    return new AudioPlayer();
  }
  EventEmitter.call(this);
}

util.inherits(AudioPlayer,EventEmitter);


oassign( AudioPlayer.prototype,
{
  /**
    nowPlaying is an instance of Media - wrapper for underlying implementation
    of sound player.
    
    If whatever you pass to the play() method has a 'mediaTags' hash of bindings
    then those bindings with show up on the nowPlaying object.
  */
  nowPlaying: null,
  
  /**
    playlist is an array of models. the .media property may not be
    present on these items.
  */
  playlist: null,

  /**
    store this here for now
  */
  wantWavImg: false,
  
  play: function(playable) {
    this._delegate(playable,'play');
  },

  stop: function(playable) {
    this._delegate(playable,'stop');
  },
    
  togglePlay: function(playable) {
    this._delegate(playable,'togglePlay');
  },

  togglePause: function(playable) {
    this._delegate(playable,'togglePause');
  },

  playNext: function() {
    this._advance(1);
  },

  playPrevious: function() {
    this._advance(-1);
  },

  hasNext: function() {
    var index = this._nowPlayingIndex();
    return index > -1 && index < this.playlist.length - 1;
  },
  
  hasPrev: function() {
    return this._nowPlayingIndex() > 0;
  },
  
  setPlaylist: function(playlist) {
    this.playlist = playlist;
    this.emit('playlist', playlist);
  },

  bindToNowPlaying: function(model) {
    var np = this.nowPlaying;
    if( np && model && model.mediaURL === np.url ) {
      model.media = np;
      return true;
    }
    return false;
  },      

  _delegate: function(playable,method) {
    var media = this._media(playable) || this.nowPlaying;
    if( media ) {
      media[method]();
    }
  },
  
  _updatePlaylist: function() {
    if( this.nowPlaying && this.playlist ) {
      if( !this.playlist.findBy('mediaURL',this.nowPlaying.url ) ) {
        // user hit 'play' on a song not in this playlist
        // nuke it
        this.playlist = null;
      }
    }
  }, // .observes('nowPlaying'),
  
  _advance: function(dir) {
    this.play( this.playlist[this._nowPlayingIndex() + dir ] );
  },
  
  _nowPlayingIndex: function() {
    var index = -1;
    var pl = this.playlist;
    if( pl && this.nowPlaying ) {
      index = pl.indexOf( pl.findBy('mediaURL',this.nowPlaying.url) );
    }
    return index;
  },
  
  _onPlay: function(media) {
    var np = this.nowPlaying;
    if( np && np !== media ) {
      np.stop();
    }
    this.nowPlaying = media;
    this._updatePlaylist();
    media.once('finish',this._onFinish.bind(this));
    this.emit('nowPlaying',media);
  },
  
  _onFinish: function(media) {
    media.stop();
    if( this.hasNext() ) {
      this.playNext();
    }
  },

  _mediaCache: {},

  _media: function(playable) {
    
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
      media = Media(args);
      media.on('play',this._onPlay.bind(this));
      cache[url] = media;
    }

    playable.media = media;

    return media;
  }
});

module.exports = AudioPlayer();
