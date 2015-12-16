import { debounce } from '../../unicorns';
import Media from './media';

const PLAYBACK_DEBOUNCE = 50;

class FLAC extends Media
{
  constructor() {
    super(...arguments);
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
    var sound = window.AV.Player.fromURL(url);
    this._play   = sound.play.bind(sound);
    this._stop   = sound.stop.bind(sound);
    this._pause  = sound.pause.bind(sound);

    sound.togglePlay  = sound.togglePlayback;
    sound.togglePause = sound.togglePlayback;

    sound.play = function() {
      me.isPaused = false;
      me.setIsPlaying(true);
      me._play();
    };

    sound.stop = function() {
      me.isPaused = false;
      me.setIsPlaying(false);
      me._stop();
    };

    sound.pause = function() {
      me.setIsPaused(true);
      me._pause();
    };

    sound.on('error',function(err) {
      me.safeEmit('error',err);
    });
    
    sound.on('end', function() {
        me.setIsPlaying(false);
        me.setIsFinished();
      });

    var onLoading = this.onLoading.bind(this);
    sound.on( 'buffer', debounce(onLoading, PLAYBACK_DEBOUNCE) );

    sound.on( 'duration', function(duration) {
        me.positionProperties.duration = duration;
      });

    sound.on( 'progress', debounce( function(position) {
        me.positionProperties.position = position;
        me.safeEmit('position',me.positionProperties,me);
      }, PLAYBACK_DEBOUNCE) ),

    //sound.preload();

    this._sound = sound;
    return sound;
  }

  onLoading(percent) {
    this.positionProperties.percentLoaded = percent;
    this.safeEmit('position',this.positionProperties,this);
  }


  setPosition(/*position*/) {
    // seek is broken
    //return this._sound.seek(position);
  }

}

module.exports = FLAC;
