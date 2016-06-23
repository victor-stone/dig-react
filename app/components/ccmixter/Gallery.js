import React               from 'react';
import css                 from './style/gallery';
import GalleryElement      from './GalleryElement';
import InlineCSS           from '../vanilla/InlineCSS';
import PlayCapture         from '../services/PlayCapture';
import { ModelTracker,
        PushPeruseModel }  from '../../mixins';

class Gallery extends PushPeruseModel(ModelTracker.extender(PlayCapture(React.Component)))
{

  stateFromStore(store) {
    return {store};
  }

  render() {
    const { store: { model: {items} } } = this.state;
    return (
      <div className="gallery">
        <InlineCSS css={css.Gallery+css.GalleryElement} id="gallery-css"/>
        <ul className="play-list">
          {items.map( m => <GalleryElement key={m.id} model={m} {...this.props}/>)}
        </ul>
      </div>
    );
  }
}


module.exports = Gallery;

//
