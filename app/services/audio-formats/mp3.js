/* global soundManager */
import { debounce } from 'unicorns';
import Media        from './media';
import env          from '../env';

const PLAYBACK_DEBOUNCE = 50;

var _didSMSetup = false;

function smFailure(status) {
  var str = `audio error(${status}) - ${status.type}`;
  env.error(str);
}

class MP3 extends Media
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

    if( !_didSMSetup ) {
      soundManager.setup( { forceUseGlobalHTML5Audio: true } );
      soundManager.ontimeout( smFailure );
      _didSMSetup = true;
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
        me.setIsFinished();
      },
      onfailure() {
        me.setSoundFail();
      },
      onload(loadOk) {
        if( !loadOk ) {
          me.setSoundFail();
        }
      },

      whileloading: debounce(me._setPositionProperties.bind(me), PLAYBACK_DEBOUNCE),
      whileplaying: debounce(me._setPositionProperties.bind(me), PLAYBACK_DEBOUNCE),
    });

    this._sound = sound;
    return sound;
  }

  _setPositionProperties() {
    var sound = this._sound;
    this.setPositionProperties(sound.bytesLoaded,
                               sound.bytesTotal,
                               sound.position,
                               sound.duration);
  }
}

module.exports = MP3;
