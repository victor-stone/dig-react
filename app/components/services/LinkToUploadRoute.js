import React        from 'react';
import Link         from './LinkToRoute';
import { sliceStr,
         selectors } from '../../unicorns';

function LinkToUploadRoute(props) {

  let { truncate = false, 
        base, 
        model,
        model: {name},
        className = ''
      }  = props;

  name = truncate ? sliceStr({str:name}) : name;
  
  const href = LinkToUploadRoute.url(model,base);
  const cls  = selectors('upload-link',className);

  return (
      <Link href={href} className={cls} {...props}>{name}{props.children}</Link>
    );
}

LinkToUploadRoute.url = function(model,altBase) {
  const base = altBase === undefined ? '/files/' : altBase;
  return base + model.artist.id + '/' + model.id;
};

module.exports = LinkToUploadRoute;

