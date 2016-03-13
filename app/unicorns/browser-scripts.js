/* globals $ */

function scrollToHash(hash) {
  hash = hash.replace(/#/,'');
  var anchor = $('a[name="'+hash+'"]');
  if( !anchor.length ) {
    anchor = $('#' + hash);
  }
  scrollToElement(anchor);
}

function scrollToTop() {
  $('html,body').animate( { scrollTop: 0 }, {duration: 'fast' } );
}

function scrollToElement(e, offset) {
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

function scrollIntoView(e, offset) {
  if( !isElementOnScreen(e) ) {
    scrollToElement(e, offset );
  }
}

function isElementOnScreen(e)
{
    var $e = $(e);
    var $w = $(window);

    var docViewTop = $w.scrollTop();
    var docViewBottom = docViewTop + document.body.clientHeight;

    var eTop = $e.offset().top;

    return eTop > docViewTop && eTop < docViewBottom;
}

module.exports = {
  scrollToHash,
  scrollToTop,
  scrollToElement,
  scrollIntoView,
  isElementOnScreen,
};