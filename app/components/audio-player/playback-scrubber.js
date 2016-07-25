/* globals $ */
import React    from 'react';
import WavImage from './WavImage';

const ONE_HUNDRED = 100;

const PlaybackScrubber = React.createClass({

  getInitialState() {
    return {
        position: this.props.position,
        media:    this.props.media
      };
  },

  componentWillReceiveProps(props) {
    this.setState( {
      position: props.position,
      media:    props.media,
    });
  },

  click(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  _isMouseDown: false,

  mouseDown() {
    this._isMouseDown = true;
  },

  mouseUp(evt) {
    this._isMouseDown = false;
    this.sendPostion(evt.clientX);
  },

  mouseMove(evt) {
    if( this._isMouseDown ) {
      this.sendPostion(evt.clientX);
    }
  },

  sendPostion(offset) {
    var $e = $(this.refs['container']);
    var width = $e.width();
    offset -= $e.position().left;
    var ratio = offset / width;
    this.state.media.setPositionPercentage(ratio);
  },

  loadingWidth() {

    const { position: {percentLoaded, bytesLoaded, bytesTotal} } = this.state;

    if( percentLoaded ) {
      return percentLoaded + '';
    }

    var val = bytesLoaded > 0 ? ONE_HUNDRED * (bytesLoaded / bytesTotal) : 0;

    return val + '';    
  },

  positionWidth() {

    const { position: {position, duration } } = this.state;

    var val = position > 0 && duration > 0 ? ONE_HUNDRED * (position / duration) : 0;

    return (val + '');      

  },

  render() {
    var loadCss = { width: this.loadingWidth() + '%' };
    var posCss  = { width: this.positionWidth() + '%' };

    return (
        <div onClick={this.click} ref="container" className="playback-scrubber pull-left hidden-xs hidden-sm">
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

