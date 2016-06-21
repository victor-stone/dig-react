import React               from 'react';
import Glyph               from '../vanilla/Glyph';
import AudioService        from '../../services/audio-player';
import Playlists           from '../../stores/playlists';
import events              from '../../models/events';

// This is broken out in it's own class in case
// it might be needed in the future somewhere

class PlaylistTracker extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = { playlistOn: this._isOurPlaylistPlaying() };
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentWillMount() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.on( events.NOW_PLAYING, this.onNowPlaying);  
    }    
  }

  componentWillUnmount() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.removeListener( events.NOW_PLAYING, this.onNowPlaying);  
    }        
  }

  togglePlay() {
    if( this._isOurPlaylistPlaying() ) {
      this.stop();
    } else {
      this.play();
    }
  }

  _isOurPlaylistPlaying() {
    var id = this.props.playlist.id;
    var nowPlaylingID = AudioService.nowPlaying && AudioService.nowPlaying.playlist;
    return( Number(nowPlaylingID) === Number(id) );
  }

  play() {
    var id = this.props.playlist.id;
    var playlists = new Playlists();
    playlists.tracksForPlaylist( id ).then( tracks => {
      AudioService.playlistURL = this._playlistURL();
      AudioService.playlist = tracks;        
      AudioService.play( tracks[0] );
    });
  }

  _playlistURL() {
    return '/playlist/browse/' + this.props.playlist.id;
  }

  stop() {
    AudioService.stop();
    this.setState( { playlistOn: false } );
  }

  onNowPlaying() {
    this.setState( { playlistOn: this._isOurPlaylistPlaying() } );
  }
}

/*
  Props 
    model = object - from models/Playlist
*/
class PlayAllButton extends PlaylistTracker
{
  render() {
    if( global.IS_SERVER_REQUEST ) {
      return null;
    }
    var icon    = this.state.playlistOn ? 'stop' : 'play';
    var caption = this.state.playlistOn ? '' : ' play all';
    return(<button className="play-all-button btn btn-sm btn-info" onClick={this.togglePlay}><Glyph icon={icon} />{caption}</button>);
  }
}

module.exports = PlayAllButton;

//