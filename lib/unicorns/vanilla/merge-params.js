import TagString from '../tag-string';
import LibArray  from '../lib-array';

export default function mergeParams( oldp, ...newPs ) {   
  var target = Object.assign( {}, oldp );   
  // TODO: how the fuck did these tags get down here
  var tagFields = LibArray.from([ 'tags', 'reqtags', 'oneof' ]);
  for( var i = 0; i < newPs.length; i++ ) {   
    var newp = newPs[i];    
    for( var k in newp ) {    
      var isRemoveParam  = k.match(/^--(.*)/);    
      if( isRemoveParam ) {   
        var realParamName = isRemoveParam[1];   
        if( tagFields.contains(realParamName) ) {   
          if( realParamName in target ) {   
            target[realParamName] = (new TagString(target[realParamName])).remove(newp[k]).toString();    
          }   
        }   
      } else {    
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
  }   
  return target;    
}


