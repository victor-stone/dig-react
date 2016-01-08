import React              from 'react';
import { ModelTracker }   from '../../mixins';
import AudioService       from '../../services/audio-player';
import { UploadLink }     from '../ActionButtons';
import { PlayButton }     from '../AudioPlayer';
import People             from '../People';
import Glyph              from  '../Glyph';

import CCMixter         from '../../stores/ccmixter';

var DeleteButton = React.createClass({

  doDelete: function() {
    var id     = this.props.playlist;
    var upload = this.props.upload;
    CCMixter.removeTrackFromPlaylist( upload, id ).then( () => {
      this.props.onDelete();
    });
  },

  render: function() {
    return (
        <button className="btn btn-danger delete-track-button" onClick={this.doDelete}><Glyph icon="trash" /></button>
      );
  }
});

var Tracks = React.createClass({

  mixins: [ ModelTracker ],

  stateFromStore: function(store) {
    return { model: store.model };
  },

  onPlay: function() {
    var model = this.state.model;
    AudioService.playlistURL = '/playlist/browse/' + model.queryParams.playlist;
    AudioService.playlist = model.items;
  },

  onTrackDelete: function() {
    this.props.store.paginate(0);
  },

  render: function() {
    var model    = this.state.model;
    var skipUser = this.props.skipUser;
    return (
        <ul className="playlist-tracks">
          {model.items.map( t => {
            return(
              <li key={t.id}>
                {this.props.editing
                  ? <DeleteButton playlist={model.queryParams.playlist} upload={t.id} onDelete={this.onTrackDelete} />
                  : null
                }
                <PlayButton className="play-button" onPlay={this.onPlay} model={t} />                
                <UploadLink className="track-name" model={t} />
                {skipUser
                  ? null
                  : <People.Link model={t.artist} className="track-artist" />
                }
              </li>
            );
          })}
        </ul>
      );
  }
});

module.exports = Tracks;

//