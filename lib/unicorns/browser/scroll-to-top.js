/* globals $ */

export default function scrollToTop() {
  $('html,body').animate( { scrollTop: 0 }, { duration: 'fast' } );
}

