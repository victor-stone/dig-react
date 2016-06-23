import React              from 'react';
import _EditableTrackList from '../bound/EditableTrackList';


/*
  An EditTrackList that is bound to a playlists 'model.tracks'
  property with special knowlege of playlists stores 

  props
    store - from stores/playlist
*/
class EditableTrackList extends React.Component
{
  constructor() {
    super(...arguments);
    this.__bindAll(['onDelete','onPlay','onSort']);
  }

  render() {
    const { store, store: { permissions: {canEdit=false} = {} } } = this.props;
    const { model: {tracks,head:{isDynamic}} } = store;

    return  (<_EditableTrackList 
                store={tracks} 
                canEdit={canEdit && !isDynamic}
                onDelete={this.onDelete}
                onPlay={this.onPlay}
                onSort={this.onSort}
             />);
  }
}

module.exports = EditableTrackList;

//