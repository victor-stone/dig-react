import React              from 'react';
import { ModelTracker }   from '../../mixins';
import AudioService       from '../../services/audio-player';
import { UploadLink }     from '../ActionButtons';
import { PlayButton }     from '../AudioPlayer';

var Tracks = React.createClass({

  mixins: [ ModelTracker ],

  stateFromStore: function(store) {
    return { model: store.model };
  },

  onPlay: function() {
    AudioService.playlist = this.state.model.items;
  },

  render: function() {
    var model    = this.state.model;
    var skipUser = this.props.skipUser;
    return (
        <ul className="playlist-tracks">
          {model.items.map( t => {
            return(
              <li key={t.id}>
                <PlayButton className="play-button" onPlay={this.onPlay} model={t} />
                <UploadLink className="track-name" model={t} />
                {skipUser
                  ? null
                  : <a className="track-artist" href={'/people/' + t.artist.id}>{t.artist.name}</a>
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