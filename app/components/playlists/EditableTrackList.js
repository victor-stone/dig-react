import React                  from 'react';
import BoundEditableTrackList from '../bound/EditableTrackList';
import { bindAll }            from '../../unicorns';
import AudioService           from '../../services/audio-player';
import LinkToPlaylist         from '../services/LinkToPlaylistRoute';

/*
  EditTrackList wrapper that displays/edits the 'tracks'
  property of the playlist store's model

  props
    store - from stores/playlist
*/
class EditableTrackList extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onPlay', 'onTrackDelete', 'onSort' );
  }

  onPlay() {
    const { items,head:{id} } = this.props.store.model;

    AudioService.playlistURL = LinkToPlaylist.url({id});
    AudioService.playlist = items;
  }

  onTrackDelete(model) {
    const { store } = this.props;

    store.removeTrack(model.id).then( () => store.model.tracks.paginate(0) );
  }

  onSort(sortSpec) {
    const { store } = this.props;

    store.reorder(sortSpec).then( () => store.model.tracks.paginate(0) );
  }

  render() {
    const { store, 
            store: { permissions: {canEdit=false} = {} } } = this.props;

    const { model: { tracks,
                     head:{isDynamic}} } = store;

    return  (<BoundEditableTrackList 
                store={tracks} 
                canEdit={canEdit && !isDynamic}
                onDelete={this.onTrackDelete}
                onPlay={this.onPlay}
                onSort={this.onSort}
             />);
  }
}

module.exports = EditableTrackList;

//