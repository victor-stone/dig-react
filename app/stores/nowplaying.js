
import AudioPlayerService from '../services/audio-player';

class NowPlaying {

  constructor() {
    var pl = AudioPlayerService.playlist || [];
    this.model = {
      playlist: pl,
      total: pl.length
    };
  }

  get supportsOptions() {
    return false;
  }
  
  on() {}
  removeListener() {}

}

module.exports = NowPlaying;

