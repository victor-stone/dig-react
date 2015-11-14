import AudioPlayerService from '../services/audio-player';
import Upload from '../stores/upload';

var NowPlayingTracker = {

  getInitialState: function() {
    return { nowPlaying: null };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioPlayerService.on('nowPlaying',this.onNowPlaying);
      this.modelFromNowPlaying( AudioPlayerService.nowPlaying );
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioPlayerService.removeListener('nowPlaying',this.onNowPlaying);
    }
  },

  onNowPlaying: function(nowPlaying) {
    this.modelFromNowPlaying(nowPlaying);
  },

  modelFromNowPlaying: function(np) {
    if( np ) {
      var upload = new Upload();
      upload.info(np.id).then( nowPlaying => this.setState( {nowPlaying} ) );
    }
  },

};

module.exports = NowPlayingTracker;

