import React               from 'react';
import css                 from './style/gallery';
import TreeGalleryElement  from './TreeGalleryElement';
import InlineCSS           from '../vanilla/InlineCSS';

class TreeGallery extends React.Component
{

  render() {
    const { model } = this.props;
    return (
      <div className="gallery">
        <InlineCSS css={css} id="gallery-css"/>
        <ul className="play-list">
          {model.map( m => <TreeGalleryElement key={m.id} {...this.props} model={m} />)}
        </ul>
      </div>
    );
  }
}


module.exports = TreeGallery;

//
