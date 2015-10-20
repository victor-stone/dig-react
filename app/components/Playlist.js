'use strict';

import React from 'react';
import Link from './Link';

var PlaylistItem = React.createClass({

  togglePlay: function() {

  },

  downloadPopup: function() {

  },

  render: function() {
      var upload = this.props.upload;
      var playStop = 'fa fa-play'; // upload.media.isPlaying ? 'stop' : 'play';
      var artistLink = '';
      var uploadHref = '/files/' + upload.artist.id + '/' + upload.id;
      if( !this.props.skipUserListing ) {
        //artistLink = (<span className="artist-name light-color"><Link href={'/people/' + upload.artist.id }>{upload.artist.name}</Link></span>);
        /*
          <a className="btn btn-lg btn-info"    href onClick={this.togglePlay}><i className={playStop}></i></a>
          <a className="btn btn-lg btn-warning" href onClick={this.downloadPopup}><i className="fa fa-cloud-download"></i></a>
          <span className="song-title"><Link href={uploadHref}>{upload.name}</Link></span> 
        */
      }
      console.log('gen: ', upload.name);
      return (
        <li className="clearfix text-nowrap">
            <Link href={uploadHref}><span>{upload.name}</span></Link>
        </li>
      );
    },

});

var Playlist = React.createClass({

  getDefaultProps: function() {
    return { skipUserListing: false }
  },

  render: function() {

    var playlistItems = this.props.model.playlist.map( (upload, index) =>
      <PlaylistItem key={upload.id} upload={upload} skipUserListing={this.props.skipUserListing} />
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

