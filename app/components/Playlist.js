'use strict';

import React from 'react';
import Link from './Link';
import Glyph from './Glyph';
import { Play as PlayButton } from './ActionButtons'
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
    return (<span className="artist-name light-color"><Link href={'/people/' + artist.id }>{artist.name}</Link></span>);  
  }

})

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
    return { skipUser: false }
  },

  render: function() {

    var playlistItems = this.props.model.playlist.map( (upload, index) =>
      <PlaylistItem key={upload.id} upload={upload} skipUser={this.props.skipUser} />
    );

    return (
      <div className="container play-list">
        <div className="row">
          <div className="col-md-9 col-md-offset-2 col-md-sm-12">
            <ul>
              {playlistItems}
            </ul>
          </div>
        </div>
      </div>      
    );
  }
});

module.exports = Playlist;

