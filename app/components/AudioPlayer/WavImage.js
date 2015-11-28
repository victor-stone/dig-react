import React        from 'react';
import ajax         from '../../services/ajax';
import AudioService from '../../services/audio-player';
import env          from '../../services/env';
import events       from '../../models/events';

const WavImage = React.createClass({

  getInitialState: function() {
    this.grabImage();
    return { svg: null };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST && env.supportWavImg ) {
      AudioService.on( events.NOW_PLAYING, this.onNowPlaying);
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST  && env.supportWavImg ) {
      AudioService.removeListener( events.NOW_PLAYING, this.onNowPlaying);
    }
  },

  onNowPlaying: function( /*nowPlaying*/ ) {
    this.grabImage();
  },

  grabImage: function() {
    if( env.supportWavImg && AudioService.nowPlaying ) {
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

