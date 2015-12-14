import React        from 'react';
import ajax         from '../../services/ajax';
import AudioService from '../../services/audio-player';
import env          from '../../services/env';
import events       from '../../models/events';

const WavImage = React.createClass({

  getInitialState: function() {
    this.grabImage();
    return { svg: null, fade: 'out' };
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
    this.setState( { fade: 'out' } );
    this.grabImage();
  },

  grabImage: function() {
    if( env.supportWavImg && AudioService.nowPlaying ) {
      var imageURL = AudioService.nowPlaying.wavImageURL;
      if( imageURL ) {
        // todo: export full xml+svg and put in <img> tag
        var args = { url: imageURL + '?w=200&h=22', method: 'GET', dataType: 'text' };
        ajax(args).then( svg => {
          this.setState( { svg, fade: 'in' } );
        });
      }      
    }
  },

  render: function() {
    /*eslint "react/no-danger":0 */
    var svg  = { __html: this.state.svg };
    var cls  = 'waveimage bar fade ' + this.state.fade;

    return (<div className={cls} dangerouslySetInnerHTML={svg}/>);
  }
});

module.exports = WavImage;

