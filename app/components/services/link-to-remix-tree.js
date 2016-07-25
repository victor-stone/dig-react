import React        from 'react';
import Glyph        from '../vanilla/glyph';
import Link         from './link-to-route';
import LinkToUpload from './link-to-upload-route';

function LinkToRemixTree(props) {
  const { model, host = ''  } = props;
  const cls = 'btn btn-info remix-tree-link';
  const url = host + LinkToUpload.url(model);
  return <Link host={host} href={url} className={cls}><Glyph icon="arrow-left" />{" Remix tree "}<Glyph icon="arrow-right" /></Link>;
}

module.exports = LinkToRemixTree;

//