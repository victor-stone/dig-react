
export default function shallowCompare(obj1,obj2) {

  if( !obj1 || !obj2 ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if( keys1.length !== keys2.length ) {
    return false;
  }

  return !keys1.find( k => !(k in obj2) || (obj1[k] !== obj2[k]) );
}

