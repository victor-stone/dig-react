'use strict';

import React              from 'react';
import Link               from './Link';
import DownloadPopup      from './DownloadPopup';
import { PlayButton }     from './AudioPlayer';
import QueryOptions       from './QueryOptions';
import AudioPlayerService from '../services/audio-player';
import PlaylistUpdater    from '../mixins/playlist-updater';

var SongLink = React.createClass({

  render: function() {
    var u = this.props.model;
    var href = '/files/' + u.artist.id + '/' + u.id;

    return (<span className="song-title"><Link href={href}>{u.name}</Link></span> );
  }

});

var ArtistLink = React.createClass({

  render: function() {
    var artist = this.props.model;
    if( this.props.skipUser ) {
      return null;
    }
    return (<span className="artist-name light-color"><Link href={'/people/' + artist.id}>{artist.name}</Link></span>);  
  }

});

var PlaylistItem = React.createClass({

  render: function() {
    var u = this.props.upload;
    var skipU = this.props.skipUser;

    return ( 
      <li className="clearfix">
        <PlayButton model={u} onPlay={this.props.onPlay}/> <DownloadPopup model={u} /> <SongLink model={u} /> <ArtistLink model={u.artist} skipUser={skipU} />
      </li>
    );
  },

});

var NotALotHere = React.createClass({

  mixins: [PlaylistUpdater],

  stateFromStore: function(store) {
    var model = store.model;
    var showNotALot = model.total < model.queryParams.limit && store.paramsDirty();
    return { showNotALot };    
  },

  render: function() {

      if( !this.state.showNotALot ) {
        return null;
      }

      return (
        <div className="container-fluid no-hit-suggestion">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <div className="jumbotron empty-query">
                  <h3>{"eh, not a lot here..."}</h3>
                    <ul>
                        <li>
                            {"You might consider resetting the options "}
                            <QueryOptions.ResetOptionsButton store={this.props.store} />
                        </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        );
  }
});

var Playlist = React.createClass({

  mixins: [PlaylistUpdater],

  getDefaultProps: function() {
    return { skipUser: false };
  },
 
  stateFromStore: function(store) {
    return { model: store.model };
  },

  onPlay: function() {
    AudioPlayerService.setPlaylist( this.state.model.playlist );
  },

  render: function() {

    var model = this.state.model;

    var playlistItems = model.playlist.map( upload =>
      <PlaylistItem key      = {upload.id} 
                    upload   = {upload} 
                    skipUser = {this.props.skipUser} 
                    onPlay   = {this.onPlay}
      />
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-md-offset-2 col-md-sm-12">
            <QueryOptions store={this.props.store} />
            <ul className="play-list">
              {playlistItems}
            </ul>
          </div>
        </div>
      </div>      
    );
  }
});

Playlist.NotALotHere = NotALotHere;

module.exports = Playlist;

