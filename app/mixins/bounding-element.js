/* global $ */
import ReactDOM from 'react-dom';

const HEIGHT_PADDING = 3;

var BoundingMixin = {

  componentDidMount: function() {
    if( !global.IS_SERVER_REQUEST && !this.props.disableBumping ) {
      this.resetBump();
      window.addEventListener('resize', this.handleResize);
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST && !this.props.disableBumping ) {
      window.removeEventListener('resize', this.handleResize);
      var $e = $(ReactDOM.findDOMNode(this));
      ['a', 'b'].forEach( k => {
        var f = 'keep-between-'+k;
        if( $e.data(f) ) {
          $(window).off('scroll',$e.data(f));
          $e.data(f,null);
        }
      });
    }
  },

  handleResize: function() {
    if( !global.IS_SERVER_REQUEST && !this.props.disableBumping ) {
      var $e = $(ReactDOM.findDOMNode(this));
      ['a', 'b'].forEach( k => {
        var f = 'keep-between-'+k;
        if( $e.data(f) ) {
          $e.data(f)();
        }
      });
    }
  },

  resetBump: function() {
    var $e = $(ReactDOM.findDOMNode(this));
    if( $e.is(':visible') ) {
      if( this.props.keepAbove ) {
        this.setupBump( $e, $(this.props.keepAbove), true );
      }
      if( this.props.keepBelow ) {
        this.setupBump( $e, $(this.props.keepBelow), false );
      }
    }
  },

  setupBump: function($e,$bumper,isKeepAbove) {
    
    if( !$e.is(':visible') ) {
      return;
    }
    
    var eHeight      = $e.outerHeight() + HEIGHT_PADDING;      
    var propName     = 'keep-between-' + (isKeepAbove ? 'a' : 'b');
    
    $e.data( propName, function() {
      // we have to do this stuff in the event handler
      // because DOM
      var bumperHeight = $bumper.outerHeight() + HEIGHT_PADDING;
      var bumperTop    = $bumper.offset().top;
      var top          = Number($e.css('top').replace(/[^-\d\.]/g, ''));
      var bumperPos    = bumperTop - $(window).scrollTop();
      
      if( isKeepAbove ) {
        if( top + eHeight > bumperPos) {
          $e.css( { top: (bumperPos-eHeight) + 'px' } );
        }
      } else { 
        if( top < bumperPos + bumperHeight ) {
          $e.css( { top: (bumperPos + bumperHeight) + 'px' } );
        }
      }
    });  

    $(window).scroll( $e.data(propName) );

    $e.data(propName)();
  },

};

module.exports = BoundingMixin;

