import AudioService from '../../services/audio-player';
import events       from 'models/events';

const PlayCaptureMixin = target => class extends target {

  constructor() {
    super(...arguments);
    this._onNowPlaying = this._onNowPlaying.bind(this);    
  }

  componentWillMount() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.on( events.NOW_PLAYING, this._onNowPlaying);  
    }    
  }

  componentWillUnmount() {
    if( !global.IS_SERVER_REQUEST ) {
      AudioService.removeListener( events.NOW_PLAYING, this._onNowPlaying);  
    }        
  }

  _onNowPlaying() {
    AudioService.playlistURL = '/nowplaying';
    AudioService.playlist = this.playableItems;
  }

  get playableItems() {
    // for example:
    return this.state.model.item;
  }
};

module.exports = PlayCaptureMixin;

