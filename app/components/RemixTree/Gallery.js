import React               from 'react';
import PlayCapture         from '../services/PlayCapture';
import TreeGallery         from '../models/TreeGallery';
import { ModelTracker,
        PushPeruseModel }  from '../../mixins';

class Gallery extends PushPeruseModel(ModelTracker.extender(PlayCapture(React.Component)))
{

  stateFromStore(store) {
    return {model:store.model.items};
  }

  render() {
    return <TreeGallery model={this.state.model} />;
  }
}

module.exports = Gallery;

//
