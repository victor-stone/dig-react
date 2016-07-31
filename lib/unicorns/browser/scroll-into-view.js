import isElementOnScreen from './is-element-on-screen';
import scrollToElement   from './scroll-to-element';

export default function scrollIntoView(e, offset) {
  if( !isElementOnScreen(e) ) {
    scrollToElement(e, offset );
  }
}
