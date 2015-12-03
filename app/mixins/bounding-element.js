/* global $ */
import ReactDOM from 'react-dom';

const HEIGHT_PADDING = 3;

var BoundingMixin = {

  componentDidMount: function() {
    if( !global.IS_SERVER_REQUEST && !this.props.disableBumping ) {
      this.elementTop = null;
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

    if( this.elementTop === null ) {
      this.elementTop = $e.offset().top;   
      $e.css( {position: 'fixed'} );
    }

    var $header = $(this.props.keepBelow);
    this.headerSize = $header.outerHeight();
    var scrollTop = $(window).scrollTop();    
    var margin = scrollTop > (this.elementTop - this.headerSize)
                    ? (this.elementTop - this.headerSize)
                    : scrollTop;

    var eBottom   = this.elementTop + ($e.outerHeight() + HEIGHT_PADDING);
    var footerTop = $(this.props.keepAbove).offset().top - scrollTop;
    if( eBottom > footerTop ) {
      margin += (eBottom - footerTop);
    }

    $e.css( { 'margin-top': -margin } );
  },

  resetBump() {
    // depricated!!
  }
};

module.exports = BoundingMixin;

