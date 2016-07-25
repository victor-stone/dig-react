import React        from 'react';
import Glyph        from '../vanilla/Glyph';
import Link         from './LinkToRoute';
import LinkToUpload from './LinkToUploadRoute';

function LinkToRemixTree(props) {
  const { model, host = ''  } = props;
  const cls = 'btn btn-info remix-tree-link';
  const url = host + LinkToUpload.url(model);
  return <Link host={host} href={url} className={cls}><Glyph icon="arrow-left" />{" Remix tree "}<Glyph icon="arrow-right" /></Link>;
}

module.exports = LinkToRemixTree;

//