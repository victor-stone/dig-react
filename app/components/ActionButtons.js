'use strict';

import React from 'react';
import Link from './Link';
import Glyph from './Glyph';

var Play = React.createClass({

  togglePlay: function() {

  },

  render: function() {
    var upload   = this.props.upload;
    var playStop = 'play'; // upload.media.isPlaying ? 'stop' : 'play';
    var cls      = "btn btn-info btn-lg";
    var sz       = this.props.big ? 'x4' : '';
    var fixed    = this.props.fixed || false;
    return <a className={cls} href onClick={this.togglePlay}><Glyph fixed={fixed} sz={sz} icon={playStop} /></a>
  },

});

var ExternalLink = React.createClass({

  render: function() {
    var subname = this.props.subname || '';
    var text    = this.props.text;
    return(        
        <a {...this.props} target="_blank"><Glyph icon="external-link" /> <span className="light-color">{subname}</span> {text}</a> 
      );
  }
});

var LicensePopup = React.createClass({

  licensePopup: function() {

  },

  render: function() {
    return(
        <a href onClick={this.licensePopup}><Glyph icon="question-circle" /></a>
      );
  }
});

var SharePopup = React.createClass({

  sharePopup: function() {

  },

  render: function() {
    var cls   = "btn btn-success btn-lg";
    var sz    = this.props.big ? 'x4' : '';
    var fixed = this.props.fixed || false;
    return (
        <a className="btn btn-lg btn-success" href onClick={this.sharePopup}><Glyph fixed={fixed} icon="share-alt" sz={sz} /></a>
      );
  }
});

var AddTrackbackPopup = React.createClass({

  addTrackbackPopup: function() {

  },

  render: function() {
    return (
      <a href onClick={this.addTrackbackPopup} className="btn btn-sm btn-success"><Glyph icon="plus" /> Add</a>
      );
  }
});

var TrackbackPopup = React.createClass({

  trackbackPopup: function() {

  },

  render: function() {
    var trackback = this.props.trackback;
    return (
        <a href onClick="this.trackbackPopup"><Glyph icon="youtube-play" /> {trackback.name}</a>
      );
  }

});

module.exports = {
  Play,
  LicensePopup,
  SharePopup,
  AddTrackbackPopup,
  TrackbackPopup,
  ExternalLink
}

