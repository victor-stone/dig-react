import React        from 'react';
import Link         from './LinkToRoute';
import { sliceStr } from '../../unicorns';

function LinkToUploadRoute(props) {

  let { truncate = false, 
        base = '/files/', 
        name,
        model: { id, artist: {id: artistID} 
      } } = props;

  name = truncate ? sliceStr(name) : name;
  
  var href = base + artistID + '/' + id;

  return (
      <Link href={href} {...props}>{name}{props.children}</Link>
    );
}

module.exports = LinkToUploadRoute;

