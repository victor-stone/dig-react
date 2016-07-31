
export default function hashParams(params) {
  var keys = Object.keys(params);
  if( !keys.length ) {
    return '';
  }
  var keyo = {};
  keys.sort().forEach( k => keyo[k] = params[k] );    
  return JSON.stringify(keyo);
}

