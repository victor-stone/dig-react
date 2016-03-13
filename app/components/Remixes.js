import React              from 'react';
import Link               from './Link';
import DownloadPopup      from './DownloadPopup';
import People             from './People';
import { PlayButton }     from './AudioPlayer';
import AudioPlayerService from '../services/audio-player';
import { ModelTracker }   from '../mixins';

import { ResetOptionsButton } from './QueryOptions';

const MIN_LIMIT = 10;

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
    return (<span className="artist-name light-color"><People.Link model={artist} /></span>);  
  }

});

var RemixLine = React.createClass({

  render: function() {
    var u     = this.props.upload;
    var skipU = this.props.skipUser;
    var cls   = this.props.noClear ? '' : 'clearfix';
    return ( 
      <li className={cls} >
        <PlayButton model={u} onPlay={this.props.onPlay}/> <DownloadPopup model={u} /> <SongLink model={u} /> <ArtistLink model={u.artist} skipUser={skipU} />
      </li>
    );
  },

});

var NotALotHere = React.createClass({

  mixins: [ModelTracker],

  stateFromStore: function(store) {
    var model = store.model;
    var showNotALot = model.total < MIN_LIMIT && store.paramsDirty();
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
                            <ResetOptionsButton store={this.props.store} />
                        </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        );
  }
});

var RemixContainer = React.createClass({

  mixins: [ModelTracker],

  getDefaultProps: function() {
    return { skipUser: false };
  },
 
  stateFromStore: function(store) {
    return { model: store.model };
  },

  onPlay: function() {
    AudioPlayerService.playlistURL = '/nowplaying';
    AudioPlayerService.playlist = this.state.model.items;
  },

  render: function() {

    var model   = this.state.model;

    var remixLines = model.items.map( upload =>
        React.createElement(this.props.remixLine,
                {
                  key: upload.id,
                  upload: upload,
                  noClear: this.props.noClear,
                  skipUser: this.props.skipUser,
                  onPlay: this.onPlay
                })
    );

    return (
      <ul className="play-list">
        {remixLines}
      </ul>
    );
  }
});

var Remixes = React.createClass({

  render() {
    return( 
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-md-offset-2 col-md-sm-12">
            {this.props.children}
            <RemixContainer remixLine={RemixLine}>
              {this.props.children}
            </RemixContainer>
          </div>
        </div>
      </div>      
      );
  }
});

Remixes.NotALotHere    = NotALotHere;
Remixes.SongLink       = SongLink;
Remixes.ArtistLink     = ArtistLink;
Remixes.RemixContainer = RemixContainer;

module.exports = Remixes;

