import React          from 'react';
import {ModelTracker} from '../../mixins';
import _PlaylistList      from '../models/playlist-list';

/*
  Display a list of Playlist reacords

  props
    store     - object   from [stores/playlists] assumes .model.items[]
*/

class PlaylistList extends ModelTracker(React.Component)
{
  stateFromStore(store) {
    return { model: store.model };
  }
  render() {
    return <_PlaylistList model={this.state.model} {...this.props} />;
  }
}

module.exports = PlaylistList;

//