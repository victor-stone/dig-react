import React          from 'react';
import {ModelTracker} from '../../mixins';
import _PlaylistList      from '../models/PlaylistList';

/*
  Display a list of Playlist reacords

  props
    store     - object   from [stores/playlists] assumes .model.items[]
*/

class PlaylistList extends ModelTracker.extender(React.Component)
{
  render() {
    <_PlaylistList model={this.state.store.model} {...this.props} />;
  }
}

module.exports = PlaylistList;

//