import React from 'react';
import Glyph from './Glyph';
import Link  from './Link';

var CloseButton = React.createClass({

  render: function() {
    /*eslint "react/no-danger":0 */
    var times    = { __html: '&times;'};

    return (
        <button type="button" {...this.props} className="close" aria-label="Close"><span aria-hidden="true" dangerouslySetInnerHTML={times} /></button>
      );
  }
});

var UploadLink = React.createClass({

  getInitialState: function() {
    return { model: this.props.model };
  },

  componentWillReceiveProps(props) {
    this.setState( { model: props.model });
  },

  render: function() {

    var model = this.state.model;
    var base  = this.props.base || '/files/';
    var href  = base + model.artist.id + '/' + model.id;
    return (
        <Link href={href} {...this.props}>{model.name}</Link>
      );
  }
});

var DeadLink = React.createClass({

  getInitialState() {
    return { onClick: this.props.onClick };
  },

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if( this.state.onClick ) {
      this.state.onClick(e);
    }
  },

  render: function() {
    return (<a className="deadlink" {...this.props} href="#" onClick={this.onClick} >{this.props.children}</a>);
  }
});

var ExternalLink = React.createClass({

  render: function() {
    var subname = this.props.subname || '';
    var text    = this.props.text;
    return(        
        <a {...this.props} target="_blank"><span className="light-color">{subname}</span>{" "}{text}{" "}<Glyph icon="external-link" /></a> 
      );
  }
});

var AddTrackbackPopup = React.createClass({

  addTrackbackPopup(e) {
    e.preventDefault();
    e.stopPropagation();
  },

  render: function() {
    return (
      <a href="#" onClick={this.addTrackbackPopup} className="hidden btn btn-sm btn-success"><Glyph icon="plus" />{" Add"}</a>
      );
  }
});


module.exports = {
  AddTrackbackPopup,
  CloseButton,
  DeadLink,
  ExternalLink,
  UploadLink
};

