import React from 'react';
import Glyph from './Glyph';

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
      <a href onClick={this.addTrackbackPopup} className="btn btn-sm btn-success"><Glyph icon="plus" />{" Add"}</a>
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
  LicensePopup,
  SharePopup,
  AddTrackbackPopup,
  TrackbackPopup,
  ExternalLink
};

