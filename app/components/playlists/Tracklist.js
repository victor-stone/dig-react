import React              from 'react';
import AudioService       from '../../services/audio-player';
import TrackList          from '../bound/TrackList';

/*
  Display a list of Upload reacords for a given playlist

  props
    store     - object   from [stores/playlist]
    editing   - boolean  true means display editing controls 
*/
class PlaylistTrackList extends React.Component
{
  constructor() {
    super(...arguments);
    this.__bindAll([ 'onPlay', 'onTrackDelete' ]);
  }

  onPlay() {
    var model = this.props.store.model;
    AudioService.playlistURL = '/playlist/browse/' + model.tracks.queryParams.playlist;
    AudioService.playlist = model.tracks.items;
  }

  onTrackDelete(model) {
    var store = this.props.store;
    store.removeTrack(model.id).then( () => store.model.tracks.paginate(0) );
  }

  render() {
    return (<TrackList 
                store={this.props.store.tracks} 
                onDelete={this.onTrackDelete} 
                onPlay={this.onPlay} 
                editing={this.props.editing} 
            />);
  }
}

module.exports = PlaylistTrackList;

//