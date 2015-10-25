'use strict';

import React from 'react';
import Link from './Link';
import DownloadPopup from './DownloadPopup';
import { PlayButton } from './AudioPlayer';

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
      <li className="clearfix text-nowrap">
        <PlayButton model={u} /> <DownloadPopup model={u} /> <SongLink model={u} /> <ArtistLink model={u.artist} skipUser={skipU} />
      </li>
    );
  },

});

var Playlist = React.createClass({

  getDefaultProps: function() {
    return { skipUser: false };
  },

  componentWillMount: function() {
    var store = this.props.store;
    store.on('playlist',this.gotPlaylist);
    store.on('playlist-loading',this.gotPlaylistLoading);
  },

  componentWillUnmount: function() {
    var store = this.props.store;
    store.removeListener('playlist',this.gotPlaylist);
    store.removeListener('playlist-loading',this.gotPlaylistLoading);
  },

  gotPlaylist: function() {
    var state = { loading: false };
    setTimeout( () => this.setState(state), 50 );
  },

  gotPlaylistLoading: function() {
    var state = { loading: true };
    setTimeout( () => this.setState(state), 50 );
  },

  render: function() {

    var model = this.props.store.model;

    var playlistItems = model.playlist.map( upload =>
      <PlaylistItem key={upload.id} upload={upload} skipUser={this.props.skipUser} />
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-md-offset-2 col-md-sm-12">
            <ul className="play-list">
              {playlistItems}
            </ul>
          </div>
        </div>
      </div>      
    );
  }
});

module.exports = Playlist;

