/* global $ */
import ReactDOM from 'react-dom';

const HEIGHT_PADDING = 3;

var TopSideElement = {

  componentDidMount: function() {
    if( !global.IS_SERVER_REQUEST  ) {
      $(window).on('scroll',this.onWindowScroll);
      this.elementTop = null;
      this.marginTop = this.props.topMargin || 0;
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      $(window).off('scroll',this.onWindowScroll);
    }
  },

  onWindowScroll: function() {
    var $e = $(ReactDOM.findDOMNode(this));
    if( this.elementTop === null ) {
      this.elementTop = $e.offset().top - this.marginTop;
      $e.css( { position: 'fixed' } );
    }
    var scrollTop = $(window).scrollTop();
    var margin = scrollTop > this.elementTop ? this.elementTop : scrollTop;

    if( this.props.keepAbove ) {
      var eBottom   = this.elementTop + ($e.outerHeight() + HEIGHT_PADDING);
      var footerTop = $(this.props.keepAbove).offset().top - scrollTop;

      if( eBottom > footerTop ) {
        margin += (eBottom - footerTop);
      }      
    }

    $e.css( { 'margin-top': -margin } );
  }

};

module.exports = TopSideElement;

