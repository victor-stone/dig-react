/* globals $ */
import React    from 'react';
import WavImage from './WavImage';

const ONE_HUNDRED = 100;

const PlaybackScrubber = React.createClass({

  getInitialState: function() {
    return {
        position: this.props.position,
        media:    this.props.media
      };
  },

  componentWillReceiveProps: function(props) {
    this.setState( {
      position: props.position,
      media:    props.media,
    });
  },

  click: function(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  _isMouseDown: false,

  mouseDown: function() {
    this._isMouseDown = true;
  },

  mouseUp: function(evt) {
    this._isMouseDown = false;
    this.sendPostion(evt.clientX);
  },

  mouseMove: function(evt) {
    if( this._isMouseDown ) {
      this.sendPostion(evt.clientX);
    }
  },

  sendPostion: function(offset) {
    var $e = $(this.refs['container']);
    var width = $e.width();
    offset -= $e.position().left;
    var ratio = offset / width;
    this.state.media.setPositionPercentage(ratio);
  },

  loadingWidth: function() {

    if( this.state.position.percentLoaded ) {
      return this.state.position.percentLoaded + '';
    }

    var loaded = this.state.position.bytesLoaded;
    var val = 0;
    if( loaded > 0  ) {
      val = ONE_HUNDRED * (loaded /  this.state.position.bytesTotal);
    }
    return val + '';
    
  },

  positionWidth: function() {

    var position = this.state.position.position;
    var duration = this.state.position.duration;
    var val = 0;
    if( position > 0 && duration > 0 ) {
      val = ONE_HUNDRED * (position / duration);
    }
    return (val + '');      

  },

  render: function() {
    var loadCss = { width: this.loadingWidth() + '%' };
    var posCss  = { width: this.positionWidth() + '%' };

    return (
        <div onClick={this.click} ref="container" className="playback-scrubber pull-left">
          <WavImage />
          <div className="loaded bar"   
               ref="loading"  
               style={loadCss} 
               onMouseMove={this.mouseMove}
               onMouseDown={this.mouseDown}
               onMouseUp={this.mouseUp}          
          />
          <div className="position bar"
               ref="position" 
               style={posCss}               
               onMouseMove={this.mouseMove}
               onMouseDown={this.mouseDown}
               onMouseUp={this.mouseUp}          
          />
        </div>
      );
  }
});


module.exports = PlaybackScrubber;

