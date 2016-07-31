/* globals $ */
import scrollToElement from './scroll-to-element';

export default function scrollToHash(hash) {
  hash = hash.replace(/#/,'');
  var anchor = $('a[name="'+hash+'"]');
  if( !anchor.length ) {
    anchor = $('#' + hash);
  }
  scrollToElement(anchor);
}

