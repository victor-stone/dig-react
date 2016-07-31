/* globals $ */


export default function scrollToElement(e, offset) {
  var $e = $(e);
  if( $e[0] ) {
    offset = offset || 0;
    var top = $e.offset().top;
    $('html,body').animate(
        { scrollTop: top - offset },
        { duration: 'slow', 
          easing: 'swing'
        }
      );
  }
}

