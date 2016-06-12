import React               from 'react';
import css                 from './style/gallery';
import GalleryElement      from './GalleryElement';
import { RemixContainer }  from '../Remixes';
import InlineCSS           from '../InlineCSS';

function Gallery(props) {
  return (
    <div className="gallery">
      <InlineCSS css={css.Gallery}         id="gallery-css"/>
      <InlineCSS css={css.GalleryElement}  id="gallery-element-css"/>
      <RemixContainer {...props} remixLine={GalleryElement} />
    </div>
  );
}

module.exports = Gallery;

//
