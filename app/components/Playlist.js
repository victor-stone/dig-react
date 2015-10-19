'use strict';

import React from 'react';

var Playlist = React.createClass({
  render: function() {
    var playlistItems = this.props.model.playlist.map(function(upload, index) {
      return (
        <li key={index}>
          {upload.name} {upload.artist.name}
        </li>
      );
    });
    return (
      <ul className="uploadList">
        {playlistItems}
      </ul>
    );
  }
});

module.exports = Playlist;

