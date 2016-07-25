import React               from 'react';
import PlayCapture         from '../services/play-capture';
import TreeTiles           from '../models/tree-tiles';
import { ModelTracker,
        PushPeruseModel }  from '../../mixins';

class Tiles extends PushPeruseModel(ModelTracker(PlayCapture(React.Component)))
{

  stateFromStore(store) {
    return {model:store.model.items};
  }

  render() {
    return <TreeTiles model={this.state.model} skipUser={this.props.skipUser} />;
  }
}

module.exports = Tiles;

//
