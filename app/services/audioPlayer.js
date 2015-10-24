/* global soundManager */
import { EventEmitter } from 'events';
import { oassign } from '../unicorns/goodies';
import util from 'util';

function computedPercentage(partial, total) {
  return function() {
    var partialVal = this[partial];
    var totalVal = this[total];
    if (totalVal) {
      return (partialVal / totalVal) * 100;
    }
    return 0;
  }
}

var MediaPrototype = {

  isPlaying:  false,
  isPaused: false,
  position: -1,
  duration: -1,
  bytesLoaded: -1,
  bytesTotal: -1,
  getPositionPercentage: computedPercentage('position', 'duration'),
  getLoadedPercentage: computedPercentage('bytesLoaded', 'bytesTotal'),
    
  sound: function() {
    var url = this.url;
    if( !url ) {
        return;
    }
    var me = this;
    var sound = soundManager.createSound({
        id:  url,
        url: url,
        onplay: function() {
            Ember.run(function() {
                me.set('isPlaying', true);
                me.trigger('onPlay',me);
            });
        },
        onstop: function() {
            Ember.run(function() {
                me.set('isPlaying', false);
                me.trigger('onStop',me);
            });
        },
        onpause: function() {
            Ember.run(function() {
                me.set('isPaused', true);
                me.trigger('onPause',me);
            });
        },
        onresume: function() {
            Ember.run(function() {
                me.set('isPaused', false);
                me.trigger('onResume',me);
            });
        },
        onfinish: function() {
            Ember.run(function() {
                me.set('isPlaying', false);
                me.trigger('onFinish',me);
            });
        },
        whileloading: function() {
                Ember.run.debounce(this.setPlaybackProperties.bind(this), 50);
            },
        whileplaying: function() {
                Ember.run.debounce(this.setPlaybackProperties.bind(this), 50);
            }
        });
        
    sound.setPlaybackProperties = function() {
        me.setProperties({
            bytesLoaded: this.bytesLoaded,
            bytesTotal: this.bytesTotal,
            position: this.position,
            duration: this.duration
            });
        };
        
    return sound;
    
  }.property('url'),

  stop: function() {
    var sound = this.sound;
    if (sound) {
      sound.stop();
    }
  },

  play: function() {
    var sound = this.sound;
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
    var sound = this.sound;
    if( sound ) {
        sound.togglePause();
    }
  },
  
  setPosition: function(position) {
    return this.sound.setPosition(position);
  },

  setPositionPercentage: function(percentage) {
    var duration = this.duration;
    return this.setPosition(duration * (percentage / 100));
  },

});

function Media(args) {
    if( !(this instanceof Media) ) {
        return new Media(args);
    }
    oassign(this,args);
}

util.inherits(Router,EventEmitter);

oassign(Media.prototype,MediaPrototype);

function AudioPlayer() {
    if( !(this instanceof AudioPlayer) ) {
        return new AudioPlayer();
    }
};

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
        var index = this._nowPlayingIndex;
        return index > -1 && index < this.playlist.length - 1;
    }.property('_nowPlayingIndex'),
    
    hasPrev: function() {
        return this._nowPlayingIndex > 0;
    }.property('_nowPlayingIndex'),
    
    bindToNowPlaying: function(model) {
        var np = this.nowPlaying;
        if( np && model) {
            if( !Array.isArray(model) ) {
                model = [ model ];
            }
            model = model.findBy('mediaURL',this.nowPlaying.url);
            if( model ) {
                model.set('media', np );
            }
        }
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
                this.set('playlist',null);
            }
        }
    }.observes('nowPlaying'),
    
    _advance: function(dir) {
        this.play( this.playlist[this._nowPlayingIndex + (1*dir)] );
    },
    
    _nowPlayingIndex: function() {
        var index = -1;
        var pl = this.playlist;
        if( pl && this.nowPlaying ) {
            index = pl.indexOf( pl.findBy('mediaURL',this.nowPlaying.url) );
        }
        return index;
    }.property('playlist','nowPlaying'),
    
    _onPlay: function(media) {
        var np = this.nowPlaying;
        if( np && np !== media ) {
            np.stop();
        }
        this.set('nowPlaying',media);
        media.one('onFinish',this, this._onFinish);
    },
    
    _onFinish: function(media) {
        media.stop();
        if( this.hasNext ) {
            this.playNext();
        }
    },

    _mediaCache: function() {
        return {};
    }.property(),

    _media: function(playable) {
        if( !playable ) {
            return;
        }
        if( playable instanceof Media ) {
            return playable;
        }
        var media = playable.media;
        if( !media ) {
            //Ember.assert('Object '+playable+' is not playable without a "mediaURL" property', playable.mediaURL);
            var url = playable.mediaURL;
            var cache = this._mediaCache;
            if (cache[url]) {
                media = cache[url];
            } else {    
                var args = oassign( { url: url },  playable.mediaTags );
                media = Media(args);
                media.on('onPlay',this,this._onPlay);
                cache[url] = media;
            }
            playable.set('media',media);
        }
        return media;
    }
});

module.exports = global.IS_SERVER_REQUEST ? AudioPlayer