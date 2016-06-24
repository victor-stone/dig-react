import React        from 'react';
import Link         from './LinkToRoute';
import { sliceStr,
         selectors } from '../../unicorns';

function LinkToUploadRoute(props) {

  let { truncate = false, 
        base = '/files/', 
        model: { name, id, artist: {id: artistID },
        className = ''
      } } = props;

  name = truncate ? sliceStr({str:name}) : name;
  
  const href = base + artistID + '/' + id;
  const cls  = selectors('upload-link',className);

  return (
      <Link href={href} className={cls} {...props}>{name}{props.children}</Link>
    );
}

module.exports = LinkToUploadRoute;

