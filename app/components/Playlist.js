'use strict';

import React from 'react';
import Link from './Link';
import DownloadPopup from './DownloadPopup';
import { PlayButton } from './AudioPlayer';
import QueryOptions   from './QueryOptions';

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

var NotALotHere = React.createClass({

  getInitialState: function() {
    var showNotALot = this.getShowNotALot();
    return { showNotALot };
  },

  componentWillMount: function() {
    var store = this.props.store;
    store.on('playlist',this.updateState);
  },

  componentWillUnmount: function() {
    var store = this.props.store;
    store.removeListener('playlist',this.updateState);
  },

  getShowNotALot: function() {
    var store = this.props.store;
    return store.model.total < store.queryParams.limit && store.paramsDirty();
  },

  updateState: function() {
    var showNotALot = this.getShowNotALot();
    this.setState( { showNotALot } );
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

Playlist.NotALotHere = NotALotHere;

module.exports = Playlist;

