/* global $ */
import ReactDOM from 'react-dom';

var TopSideElement = {

  componentDidMount: function() {
    if( !global.IS_SERVER_REQUEST  ) {
      $(window).on('scroll',this.onWindowScroll);
      this.elementTop = null;
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
      this.elementTop = $e.offset().top;      
    }
    var scrollTop = $(window).scrollTop();    
    var margin = scrollTop > this.elementTop ? this.elementTop : scrollTop;
    $e.css( { 'margin-top': -margin } );
  }

};

module.exports = TopSideElement;

