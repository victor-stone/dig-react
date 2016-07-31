
const HASH_SHIFT = 5;

export default function hashCode(str) {
  var hash = 0, i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << HASH_SHIFT) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}


