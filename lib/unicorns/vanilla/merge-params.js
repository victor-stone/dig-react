import TagString from '../tag-string';
import LibArray  from '../lib-array';


export default function mergeParams( oldp, ...newPs ) {
  var target = Object.assign( {}, oldp );
  // TODO: how the fuck did these tags get down here
  var tagFields = LibArray.from([ 'tags', 'reqtags', 'oneof' ]); // WTF!!!! 
  for( var i = 0; i < newPs.length; i++ ) {
    var newp = newPs[i];
    for( var k in newp ) {
      if( tagFields.contains(k) ) {
        if( target[k] ) {
          target[k] = (new TagString(target[k])).add( newp[k]).toString();
        } else {
          target[k] = newp[k];
        }
      } else {
        target[k] = newp[k];
      }
    }
  }
  return target;
}

