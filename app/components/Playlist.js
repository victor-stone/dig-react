'use strict';

import React from 'react';
import Link from './Link';

var PlayButton = React.createClass({

  togglePlay: function() {

  },

  render: function() {
    var upload = this.props.upload;
    var playStop = 'fa fa-play'; // upload.media.isPlaying ? 'stop' : 'play';

    return <a className="btn btn-lg btn-info" href onClick={this.togglePlay}><i className={playStop}></i></a>
  },

});

var DownloadPopupButton = React.createClass({

  downloadPopup: function() {

  },

  render: function() {

    return (<a className="btn btn-lg btn-warning" href onClick={this.downloadPopup}><i className="fa fa-cloud-download"></i></a>);

  },

});

var SongLink = React.createClass({

  render: function() {
    var upload = this.props.upload;
    var uploadHref = '/files/' + upload.artist.id + '/' + upload.id;

    var lnk = React.createElement( Link, { href: uploadHref }, upload.name );
    return React.createElement( 'span', { className: 'song-title' }, lnk );

    //    return (<span className="song-title"><Link href={uploadHref}>{upload.name}</Link></span> );
  }

});

var ArtistLink = React.createClass({

  render: function() {
    var artist = this.props.artist;

    return (<span className="artist-name light-color"><Link href={'/people/' + artist.id }>{artist.name}</Link></span>);  
  }

})

var PlaylistItem = React.createClass({

  render: function() {
    var u = this.props.upload;
    if( this.props.skipUserListing ) {
      return ( <li className="clearfix text-nowrap">
          <PlayButton upload={u} /><DownloadPopupButton upload={u} /><SongLink upload={u} />
        </li> );
    } else {
      return ( <li className="clearfix text-nowrap">
        <PlayButton upload={u} /><DownloadPopupButton upload={u} /><SongLink upload={u} />
        <ArtistLink artist={u.artist} />
      </li>);
    }
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

