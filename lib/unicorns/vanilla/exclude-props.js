

export default function excludeProps(props,exclude) {
  const NOT_FOUND = -1;
  const results = {};
  Object.keys(props)
    .filter( k => exclude.indexOf(k) === NOT_FOUND )
    .forEach( k => results[k] = props[k] );
  return results;
}


