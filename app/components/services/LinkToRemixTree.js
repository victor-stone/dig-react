import React        from 'react';
import Glyph        from '../vanilla/Glyph';
import LinkToRoute  from './LinkToRoute';

function LinkToRemixTree(props) {
  var upload  = props.model;
  var ccmLink = '/files/' + upload.artist.id + '/' + upload.id;
  return <LinkToRoute href={ccmLink} className="btn btn-info"><Glyph icon="arrow-left" />{" Remix tree "}<Glyph icon="arrow-right" /></LinkToRoute>;
}


module.exports = LinkToRemixTree;

//