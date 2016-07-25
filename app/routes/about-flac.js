import React from 'react';

import { ActionButtons,
         Glyph,
         Topic       } from '../components';

import env    from '../services/env';
import FLAC   from '../services/audio-formats/flac';
import Audio  from '../services/audio-player';
import events from '../models/events';

var ExternalLink = ActionButtons.ExternalLink;

const FLAC_URL = 'http://ccmixter.org/content/DaveMerrick/DaveMerrick_-_Loose_Funky_Foot_(Samplepack)_3.flac';

/* eslint no-magic-numbers:0 */
function formatMS(time) {
  function two(n) {
    if( n < 10 ) {
      return '0' + n;
    }
    return n + '';
  }
  function four(n) {
    if( n <   10 ) { return '00' + n; }
    if( n <  100 ) { return '0'  + n; }
    return n + '';
  }
  var ms = time % 1000;
  var sec = Math.floor(time / 1000) % 60;
  var min = Math.floor((time / 1000) / 60) % 60;
  return two(min) + ':' + two(sec) + '.' + four(ms);
}

const FLACTest = React.createClass({

  getInitialState: function() {
    return {
      started: false,
      position: {}
    };
  },

  componentWillMount: function() {
    if( Audio.nowPlaying ) {
      Audio.nowPlaying.stop();
    }
  },

  componentWillUnmount: function() {
    if( this.state.flac ) {
      this.state.flac.removeListener(events.CONTROLS,this.onControls);
      this.state.flac.removeListener(events.POSITION,this.onPosition);
      this.state.flac.removeListener(events.FINISH,  this.onFinish);
      this.state.flac.soundStop();
    }
  },

  doTest: function() {

    try {
      var flac = new FLAC( { url: FLAC_URL } );
      flac.on( events.CONTROLS,  this.onControls);
      flac.on( events.POSITION,  this.onPosition);
      flac.on( events.FINISH,    this.onFinish);
      flac.on( events.ERROR,     e => this.setState( {exception: e }) );
      flac.play();
      this.setState( {
        flac,
        started: true,
        waiting: true,
      });
    } catch(e) {
      env.set( {supportFLAC: false} );
      this.setState( {
        exception: e,
      });
    }
  },

  onControls(media) {
    this.setState({
      isPlaying: media.isPlaying,
      waiting: false
    });
  },

  onPosition(position) {
    this.setState({ waiting: false, position });
  },

  onFinish: function() {
    this.setState( { done: true } );
  },

  toggle: function() {
    this.state.flac.togglePlay();
  },

  toggleEnvState: function() {
    env.supportFLAC = !env.supportFLAC;
    this.setState( { supportFLAC: env.supportFLAC } );
  },

  renderStates: function() {

    var states = [];

    if( this.state.exception ) {
      states.push('ex');
    } else {

      var viable = false;

      if( !this.state.started ) {
        states.push('test');
      } else if( this.state.waiting ) {
        states.push('waiting');
      } else {
        if( this.state.isPlaying ) {
          states.push('pause');
        } else {
          states.push('play');
        }      

        if( this.state.position.percentLoaded > 0 ) {
          states.push('percent');
        }
        if( this.state.position.duration > 0 ) {
          states.push('duration');
        }
        if( this.state.position.position > 0 ) {
          states.push('position');
          viable = true;
        }
      }      

      if( viable || env.supportFLAC ) {
        states.push('viable');
      }

    }
    return states;
  },

  render: function() {

    var states = this.renderStates();
    var isEnabled = env.supportFLAC;

    return (
          <ul className="flac-tester">
          {states.map( (s,i) => {
            switch(s) {
              case 'ex': {
                return <li key={i}><span className="label label-danger"><Glyph icon="close" />{" Sorry - but it seems your browser is not going to cooperate..."}</span></li>;
              }
              case 'test': {
                return <li key={i}><button onClick={this.doTest} className="btn btn-lg btn-warning">{"Test FLAC Support"}</button></li>;
              }
              case 'waiting': {
                return <li key={i}><label className="label label-default">{"Waiting..."}</label></li>;
              }
              case 'pause': 
              case 'play': {
                return <li key={i}><button className="btn btn-info" onClick={this.toggle}><Glyph icon={s} /></button></li>;
              }
              case 'percent': {
                return <li key={i}><label className="label label-primary">{"Loading: "}{Math.floor(this.state.position.percentLoaded)}{"%"}</label></li>;                
              }
              case 'duration': {
                return <li key={i}><label className="label label-primary">{"Duration: "}{formatMS(this.state.position.duration)}{"ms"}</label></li>;
              }
              case 'position': {
                return <li key={i}><label className="label label-primary">{"Position: "}{formatMS(this.state.position.position)}{"ms"}</label></li>;
              }
              case 'viable': {
                return <li key={i}><label labelFor="f" className="btn btn-success">{"Enable experimental FLAC feature "}<input type="checkbox" onChange={this.toggleEnvState} checked={isEnabled} id="f" /></label></li>;
              }
            }
          })}
        </ul>
      );
  }
});

const aboutFLAC = React.createClass({

  render: function() {
    return(
      <Topic.TopicPage title="About FLAC" icon="file-audio-o" >
        <p><ExternalLink href="https://en.wikipedia.org/wiki/FLAC" text="FLAC" />
           {` is an audio coding format for lossless compression of digital audio. Many of
            our artists use it to upload samples because it is the best quality 
            at the smallest possible size.`}</p>
        <p>{`Unfortunately many browsers can not play FLAC files -- 
              but yours might!`}</p>
        <p>{`
            `}</p>
        <FLACTest />
      </Topic.TopicPage>
      );
  }
});


aboutFLAC.title = 'About FLAC';

module.exports = aboutFLAC;