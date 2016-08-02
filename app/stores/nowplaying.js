
import AudioPlayerService from 'services/audio-player';

/*
  Pretends to be a store for NowPlaying page.
*/
class NowPlaying {

  constructor() {
    var pl = AudioPlayerService.playlist || [];
    this.model = {
      items: pl,
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

