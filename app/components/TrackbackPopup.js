import React from 'react';
import Modal from './Modal';
import { ExternalLink } from './ActionButtons';
import Glyph from './Glyph';

const TrackbackPopupLink = React.createClass({

  handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onShow();
  },

  render: function() {
    var trackback = this.props.trackback;
    return (
        <a href="#" onClick={this.handleClick} ><Glyph icon="youtube-play" /> {trackback.name}</a>
      );
  }
});

const TrackbackPopup = React.createClass({

  getInitialState: function() {
    return {view: {showModal: false} };
  },
  
  componentDidUpdate: function() {
    if( this.state.view.showModal ) {
      /* global $ */
      if( $('iframe').length ) {
        $('iframe').each( function() {
            $(this).css( { overflow: 'hidden', width: '100%', 'max-height': '300px' } );
          });
      }
    }
  },

  handleHideModal: function() {
    this.setState({view: {showModal: false}});
  },

  handleShowModal: function() {
    this.setState({view: {showModal: true}});
  },

  genPopup: function() {
    var trackback = this.props.trackback;
    var html      = { __html: trackback.embed };
    /*eslint "react/no-danger":0 */
    return ( 
        <Modal handleHideModal={this.handleHideModal} title={trackback.name} subTitle="Trackback">
          <div dangerouslySetInnerHTML={html} />
          <ExternalLink href={trackback.url} text="Original" />
        </Modal>
      );
  },

  render: function() {
    var trackback = this.props.trackback;
    var popup = this.state.view.showModal ? this.genPopup() : null;
    return (
        <span>
          <TrackbackPopupLink trackback={trackback} onShow={this.handleShowModal} />
          {popup}
        </span>
      );
  }

});


module.exports = TrackbackPopup;