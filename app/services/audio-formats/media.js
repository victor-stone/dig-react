import { oassign } from '../../unicorns';
import Eventer     from '../eventer';

const EMIT_DELAY = 50;

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
        percentLoaded: 0,
      },      
      _sound: null,
    });
  }

  setPositionProperties(bytesLoaded,bytesTotal,position,duration) {
    oassign(this.positionProperties,{
          bytesLoaded,
          bytesTotal,
          position,
          duration
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

  togglePause() {
    var sound = this.sound();
    if( sound ) {
      sound.togglePause();
    }
  }
  
  togglePlay() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
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
    this.fastEmit( flag ? 'play' : 'stop', this );
    this.fastEmit( 'controls', this );
  }

  setIsPaused(flag) {
    this.isPaused = flag;
    this.fastEmit( 'controls', this );
  }

  setIsFinished() {
    this.fastEmit('finish',this);
  }
  
  setSoundFail() {
    this.isPaused = false;
    this.isPlaying = false;
    this.fastEmit( 'stop', this );
    this.fastEmit( 'controls', this );
    this.fastEmit( 'finish', this );
  }

  fastEmit() {
    this.emit.apply(this,arguments);
  }  
  
  safeEmit() {
    setTimeout( () => this.emit.apply(this,arguments), EMIT_DELAY );    
  }

}

module.exports = Media;