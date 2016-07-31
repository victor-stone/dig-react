/* globals $ */

export default function makeAbs(sel) {
  var el = $(sel);
  var pos = el.position();
  el.css({
      position: 'absolute',
      marginLeft: 0,
      marginTop: 0,
      top: pos.top,
      left: pos.left
  });  
}

