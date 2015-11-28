import AudioService from '../services/audio-player';
import Upload       from '../stores/upload';
import { oassign }  from '../unicorns';
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

  onNowPlaying: function(nowPlaying) {
    this.modelFromNowPlaying(nowPlaying);
  },

  modelFromNowPlaying: function(np) {
    if( np ) {
      var userState = {};
      if( this.onNowPlayingState ) {
        userState = this.onNowPlayingState();
      }
      var upload = new Upload();
      upload.info(np.id).then( nowPlaying => this.setState( oassign({nowPlaying},userState) ) );
    }
  },

};

module.exports = NowPlayingTracker;

