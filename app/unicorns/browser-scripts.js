/* globals $ */

function scrollToHash(hash) {
  try {  
    hash = hash.replace(/#/,'');
    var anchor = $('a[name="'+hash+'"]');
    var offset = 0; 
    $('html,body').animate(
        { scrollTop: $(anchor).offset().top - offset },
        { duration: 'slow', 
          easing: 'swing'
        }
      );
  }
  catch( e ) {
    // nothing
  }
}

function scrollToTop() {
  $('html,body').animate( { scrollTop: 0 }, {duration: 'fast' } );
}

module.exports = {
  scrollToHash,
  scrollToTop
};