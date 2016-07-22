import React              from 'react';
import TrackListProperty  from '../properties/TrackList';

import { bindAll }        from '../../unicorns';
import AudioService       from '../../services/audio-player';
import LinkToPlaylist     from '../services/LinkToPlaylistRoute';

/*
  Wrapper that displays/edits the 'tracks'
  property of the playlist store's model

  props
    store - from stores/playlist
*/
class PlaylistTrackList extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onPlay', 'onTrackDelete' );
  }

  onPlay() {
    const { items, head:{id} } = this.props.store.model;

    AudioService.playlistURL = LinkToPlaylist.url({id});
    AudioService.playlist = items;
  }

  onTrackDelete(model) {
    const { store } = this.props;

    // TODO: this can't possible be the best way to do this
    
    store.removeTrack(model.id).then( () => store.model.tracks.paginate(0) );
  }

  render() {
    const { model: {tracks}, isDynamic } = this.props.store;

    return (<TrackListProperty 
              canEdit={!isDynamic}
              store={tracks} 
              onDelete={this.onTrackDelete}
              onPlay={this.onPlay}
            />);
  }
}

module.exports = PlaylistTrackList;

//