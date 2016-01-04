import AudioService from '../services/audio-player';
import Playlists    from '../stores/playlists';
import events       from '../models/events';

var PlaylistTracker = {

  getInitialState: function() {
    return { playlistOn: this._isOurPlaylistPlaying() };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.on( events.NOW_PLAYING, this.onNowPlaying);  
    }    
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.removeListener( events.NOW_PLAYING, this.onNowPlaying);  
    }        
  },

  togglePlay() {
    if( this._isOurPlaylistPlaying() ) {
      this.stop();
    } else {
      this.play();
    }
  },

  _isOurPlaylistPlaying() {
    if( global.IS_SERVER_REQUEST ) {
      return false;
    }
    var id = this.props.playlist;
    var nowPlaylingID = AudioService.nowPlaying && AudioService.nowPlaying.playlist;
    return( Number(nowPlaylingID) === Number(id) );
  },

  play() {
    var id = this.props.playlist;
    var playlists = new Playlists();
    playlists.tracksForPlaylist( id ).then( tracks => {
      AudioService.playlistURL = this._playlistURL();
      AudioService.playlist = tracks;        
      AudioService.play( tracks[0] );
    });
  },

  _playlistURL() {
    return '/playlist/browse/' + this.props.playlist;
  },

  stop() {
    AudioService.stop();
    this.setState( { playlistOn: false } );
  },

  onNowPlaying() {
    this.setState( { playlistOn: this._isOurPlaylistPlaying() } );
  },
};

module.exports = PlaylistTracker;

