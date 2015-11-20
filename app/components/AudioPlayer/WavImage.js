import React        from 'react';
import ajax         from '../../services/ajax';
import AudioService from '../../services/audio-player';


const WavImage = React.createClass({

  getInitialState: function() {
    this.grabImage();
    return { svg: null };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST && AudioService.wantWavImg ) {
      AudioService.on('nowPlaying',this.onNowPlaying);
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST  && AudioService.wantWavImg ) {
      AudioService.removeListener('nowPlaying',this.onNowPlaying);
    }
  },

  onNowPlaying: function( /*nowPlaying*/ ) {
    this.grabImage();
  },

  grabImage: function() {
    if( AudioService.wantWavImg && AudioService.nowPlaying ) {
      var imageURL = AudioService.nowPlaying.wavImageURL;
      if( imageURL ) {
        // todo: export full xml+svg and put in <img> tag
        var args = { url: imageURL, method: 'GET', dataType: 'text' };
        ajax(args).then( svg => {
          this.setState( { svg } );
        });
      }      
    }
  },

  render: function() {
    /*eslint "react/no-danger":0 */
    var svg  = this.state.svg ? { __html: this.state.svg } : null;

    return svg ? <div className="waveimage bar fade in" dangerouslySetInnerHTML={svg}/> : <div className="waveimage bar" />;
  }
});

module.exports = WavImage;

