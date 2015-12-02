/* global $ */
import ReactDOM from 'react-dom';

const HEIGHT_PADDING = 3;

var BoundingMixin = {

  componentDidMount: function() {
    if( !global.IS_SERVER_REQUEST && !this.props.disableBumping ) {
      $(window).on('scroll', this.onWinScroll);
      //this.resetBump();
      //window.addEventListener('resize', this.handleResize);
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST && !this.props.disableBumping ) {
      $(window).off('scroll', this.onWinScroll);
    }
  },

  onWinScroll: function() {
    var $e = $(ReactDOM.findDOMNode(this));

    if( !$e.is(':visible') ) {
      return;
    }

    var $keepAbove = $(this.props.keepAbove);
    var $keepBelow = $(this.props.keepBelow);

    var eHeight = $e.outerHeight() + HEIGHT_PADDING;
    var eTop    =  Number($e.css('top').replace(/[^-\d\.]/g, ''));
    var eBottom = eTop + eHeight;
    var winTop  =  $(window).scrollTop();
    
    var above = {
      height: $keepAbove.outerHeight() + HEIGHT_PADDING,
      top:    $keepAbove.offset().top,
    };
    above.pos    = above.top - winTop;
    
    var below = {
      height: $keepBelow.outerHeight() + HEIGHT_PADDING,
      top:    $keepBelow.offset().top,
    };
    below.pos    = below.top - winTop;
    below.bottom = below.pos + below.height;

    var value   = '';
    if( eBottom > above.pos ) {
      value = above.pos - eHeight;
    } else if( eTop < below.bottom ) {
      value = below.bottom;
    } else if( eTop < 0 ) {
        if( winTop + eHeight > above.top ) {
          value = above.pos - eHeight;
        } else {
          value = below.top + below.height; // use offset values for winpos
        }
    }

    if( value ) {
      $e.css( { top: value + 'px' } );
    }
  },

  resetBump() {
    // depricated!!
  }
};

module.exports = BoundingMixin;

