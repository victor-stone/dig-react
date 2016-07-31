
export default function quickLoop(arr,cb) {
  arr = Array.from(arr);
  for( var i = arr.length-1; i>=0; i--) {
    if( cb(arr[i],i) === quickLoop.STOP ) {
      break;
    }
  }
}

quickLoop.STOP = Symbol('quickLoop.stop');

