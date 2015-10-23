'use strict';

import React from 'react';
import Link from './Link';
import { Play as PlayButton } from './ActionButtons';
import DownloadPopup from './DownloadPopup';

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
        <PlayButton upload={u} /> <DownloadPopup model={u} /> <SongLink model={u} /> <ArtistLink model={u.artist} skipUser={skipU} />
      </li>
    );
  },

});

var Playlist = React.createClass({

  getDefaultProps: function() {
    return { skipUser: false };
  },

  componentWillMount: function() {
    var model = this.props.model;
    model.store.on('playlist',this.gotPlaylist);
    this.setState( { 
      model: model,
      loading: false
    });
  },

  componentWillUnmount: function() {
    this.state.model.store.removeListener('playlist',this.gotPlaylist);
  },

  gotPlaylist: function(promise) {
    this.setState( { loading: true } );
    promise.then( results => {
      // throw this back on the window thread
       setTimeout( () =>
        this.setState( {
          model: results,
          loading: false,
        }), 50 );
    });
  },

  render: function() {

    var playlistItems = this.state.model.playlist.map( upload =>
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

