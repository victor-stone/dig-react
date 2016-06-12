import AudioService from '../services/audio-player';
import Upload       from '../stores/upload';
import events       from '../models/events';

var NowPlayingTracker = {

  getInitialState: function() {
    return { nowPlaying: null };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.on( events.NOW_PLAYING, this.onNowPlaying);
      this.modelFromNowPlaying( AudioService.nowPlaying );
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.removeListener( events.NOW_PLAYING, this.onNowPlaying);
    }
  },

  onNowPlaying(nowPlaying) {
    this.modelFromNowPlaying(nowPlaying);
  },

  modelFromNowPlaying(np) {
    if( np ) {
      var upload = new Upload();
      upload.info(np.id).then( nowPlaying => {
        if( this.onNowPlayingState ) {
          this.onNowPlayingState(nowPlaying);
        } else {
          this.setState( {nowPlaying} );
        }
      });
    }
  },

};

module.exports = NowPlayingTracker;

