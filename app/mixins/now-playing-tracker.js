import AudioService from '../services/audio-player';
import Upload       from '../stores/upload';
import events       from '../models/events';

const NowPlayingTracker = target => class extends target {

  constructor() {
    super(...arguments);
    this.onNowPlaying = this.onNowPlaying.bind(this);
    this.state = { nowPlaying: null };    
  }

  componentWillMount() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.on( events.NOW_PLAYING, this.onNowPlaying);
      this.modelFromNowPlaying( AudioService.nowPlaying );
    }
  }

  componentWillUnmount() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.removeListener( events.NOW_PLAYING, this.onNowPlaying);
    }
  }

  onNowPlaying(nowPlaying) {
    this.modelFromNowPlaying(nowPlaying);
  }

  modelFromNowPlaying(np) {
    if( np ) {
      var upload = new Upload();
      upload.info(np.id).then( nowPlaying => this.onNowPlayingState  
                                               ? this.onNowPlayingState(nowPlaying)
                                               : this.setState( {nowPlaying} ) );
    }
  }

};

module.exports = NowPlayingTracker;

