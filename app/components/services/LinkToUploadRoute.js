import React        from 'react';
import Link         from './LinkToRoute';
import { sliceStr } from '../../unicorns';

function LinkToUploadRoute(props) {

  let { truncate = false, 
        base = '/files/', 
        model: { name, id, artist: {id: artistID } 
      } } = props;

  name = truncate ? sliceStr({str:name}) : name;
  
  var href = base + artistID + '/' + id;

  return (
      <Link href={href} {...props}>{name}{props.children}</Link>
    );
}

module.exports = LinkToUploadRoute;

