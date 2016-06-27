import TagString from './tag-string';

module.exports = function selectors(...args) {
  var filtered = args.filter(t=>!!t);
  if( !filtered.length ) { return ''; }
  if( filtered.length === 1 ) { return filtered[0]; }
  return new TagString(null,{separator:' '}).concat(...filtered).toString();
};