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
    var store   = this.props.store;
    var model   = store.model;

    return  (<_EditableTrackList 
                store={model.tracks} 
                canEdit={store.permissions.canEdit && !model.head.isDynamic}
                onDelete={this.onDelete}
                onPlay={this.onPlay}
                onSort={this.onSort}
             />);
  }
}

module.exports = EditableTrackList;

//