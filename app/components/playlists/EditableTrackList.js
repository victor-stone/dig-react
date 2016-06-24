import React                  from 'react';
import BoundEditableTrackList from '../bound/EditableTrackList';
import { bindAll }            from '../../unicorns';
import AudioService           from '../../services/audio-player';

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
    bindAll( this, 'onPlay', 'onTrackDelete', 'onSort' );
  }

  onPlay() {
    const { items,items:{queryParams:{playlist}} } = this.props.store.model;

    AudioService.playlistURL = '/playlist/browse/' + playlist;
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