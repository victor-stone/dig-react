
export default function dataProps(props) {
  const results = {};
  const test = /^data\-/;
  for( const key in props ) {
    if( test.test(key) ) {
        results[key] = props[key];
    }
  }
  return results;
}
