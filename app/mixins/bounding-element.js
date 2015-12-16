/* global $ */
import ReactDOM from 'react-dom';

const HEIGHT_PADDING = 3;

var BoundingMixin = {

  componentDidMount: function() {
    if( !global.IS_SERVER_REQUEST && !this.props.disableBumping ) {
      $(window).on('scroll', this.onWinScroll);
      this.elementTop = null;
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

    if( this.props.disableAtWidth && $(window).width() <= this.props.disableAtWidth ) {
      $e.css( { position: 'initial', 'margin-top': 0 } );
    } else {
      if( !this.elementTop ) {
        this.elementTop = $e.offset().top;
        $e.css( { position: 'fixed' } );
      }

      var $header     = $(this.props.keepBelow);
      var headerSize  = $header.outerHeight(true);
      var scrollTop   = $(window).scrollTop();    
      var margin      = scrollTop > (this.elementTop - headerSize)
                          ? (this.elementTop - headerSize)
                          : scrollTop;

      var eBottom   = this.elementTop + ($e.outerHeight() + HEIGHT_PADDING);
      var footerTop = $(this.props.keepAbove).offset().top - scrollTop;

      if( eBottom > footerTop ) {
        margin += (eBottom - footerTop);
      }

      $e.css( { 'margin-top': -margin } );
    }
  },

};

module.exports = BoundingMixin;

