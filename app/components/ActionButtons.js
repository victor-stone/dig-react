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
  AddTrackbackPopup,
  CloseButton,
  ExternalLink
};

