import React from 'react';
import Glyph from './Glyph';

var CloseButton = React.createClass({

  render: function() {
    /*eslint "react/no-danger":0 */
    var times    = { __html: '&times;'};

    return (
        <button type="button" {...this.props} className="close" aria-label="Close"><span aria-hidden="true" dangerouslySetInnerHTML={times} /></button>
      );
  }
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
      <a href onClick={this.addTrackbackPopup} className="hidden btn btn-sm btn-success"><Glyph icon="plus" />{" Add"}</a>
      );
  }
});


module.exports = {
  SharePopup,
  AddTrackbackPopup,
  CloseButton,
  ExternalLink
};

