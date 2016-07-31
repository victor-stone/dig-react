
const ELLIPSE = '...';

export default function ellipse(str,len) {
  if( str.length > len ) {
    return str.substr(0,len-ELLIPSE.length) + ELLIPSE;
  }
  return str;
}

