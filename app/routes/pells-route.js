import React            from 'react';
import { mergeParams }  from '../unicorns';
import qc               from '../models/query-configs';
import Acappellas       from '../stores/acappellas';
import { Glyph,
          DownloadPopup,
          Paging  }     from '../components';
import { ExternalLink } from '../components/ActionButtons';
import AudioPlayerService from '../services/audio-player';

import PlaylistUpdater from '../mixins/playlist-updater';

var PellTabs = React.createClass({

  mixins: [PlaylistUpdater],

  stateFromStore: function(store) {
    var totals = store.model.totals;
    return { totals };
  },

  onFilter: function(filter) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      var offset = 0;
      this.props.store.applyParams({filter,offset});
    };
  },

  checkActive: function(filter) {
    return filter == this.props.store.model.params.filter ? 'active' : '';
  },

  render: function() {
    var totals = this.state.totals;

    return (
      <ul className="nav nav-tabs">
        {totals.featured
          ? <li className={this.checkActive('featured')} ><a href="#" onClick={this.onFilter('featured')}>{"featured "}<span className="badge">{totals.featured}</span></a></li>
          : null
        }
        <li className={this.checkActive('all')}><a href="#" onClick={this.onFilter('all')}>{"all "}<span className="badge">{totals.all}</span></a></li>
        {totals.spoken_word 
          ? <li className={this.checkActive('spoken_word')}><a href="#" onClick={this.onFilter('spoken_word')}>{"spoken "}<span className="badge">{totals.spoken_word}</span></a></li>
          : null
        }
        {totals.rap
          ? <li className={this.checkActive('rap')}><a href="#" onClick={this.onFilter('rap')}>{"rap "}<span className="badge">{totals.rap}</span></a></li>
          : null
        }  
        {totals.melody
          ? <li className={this.checkActive('melody')}><a href="#" onClick={this.onFilter('melody')}>{"melody "}<span className="badge">{totals.melody}</span></a></li>
          : null
        }
      </ul>
      );
  }
});

var PellListing = React.createClass({

  mixins: [PlaylistUpdater],

  stateFromStore: function(store) {
    var playlist = store.model.playlist;
    var artist   = store.model.artist;
    return { playlist, artist };
  },

  setArtist: function(artist) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      var offset = 0;
      this.props.store.applyParams({artist,offset});
    };
  },

  selectLine: function(pell) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.props.store.selected = pell.id;
      AudioPlayerService.togglePlay(pell);
    };
  },

  render: function() {

    function pellLine(pell) {

      var args = [ 'li', { onClick: this.selectLine(pell), key: pell.id } ];
      if( pell.bpm ) {
        var e = React.createElement('span', { className: 'bpm' }, 'bpm: ', pell.bpm);
        args.push(e); 
      }

      var e1 = React.createElement('span', { className: 'title' }, pell.name);
      args.push(e1);

      if( !artist ) {
        var e2 = React.createElement('a', 
                                    { href: '#', onClick: this.setArtist(pell.artist.id) }, 
                                      pell.artist.name);
        var e3 = React.createElement('span', null, e2 );
        args.push(e3);
      }

      return React.createElement.apply(React,args);
    }

    var playlist = this.state.playlist;
    var artist   = this.state.artist;
    var lines    = playlist.map(pellLine.bind(this));

    return React.createElement( 'ul', null, lines );
    }
});


var PellHeader = React.createClass({

  mixins: [PlaylistUpdater],

  stateFromStore: function(store) {
    var artist = store.model.artist;
    return { artist };    
  },

  clearArtist: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.store.applyParams({artist:null,filter:'featured'});
  },

  render: function() {
    var artist = this.state.artist;
    return (
        <div className="page-header center-text">
         {artist          
          ? <h2><a href="#" onClick={this.clearArtist} ><Glyph icon="chevron-circle-left" />{" everybody"}</a> <img src={artist.avatarURL} />{artist.name}</h2>
          : <h1><Glyph icon="microphone" />{" Pells"}</h1>
        }
        </div>
      );
  }

});

var PellDetail = React.createClass({

  getInitialState: function() {
    var model = this.props.store.selected;
    return { model };
  },

  componentWillMount: function() {
    this.props.store.on('selected',this.onSelected);
  },

  componentWillUnmount: function() {
    this.props.store.removeListener('selected',this.onSelected);
  },

  onSelected: function(model) {
    this.setState( { model } );
  },

  render: function() {

    var model  = this.state.model;
    if( !model ) {
      return null;
    }

    return (
        <div>
          <h3>{model.name}</h3>
          <ul className="download-list">
            {model.files.map( file => {
              return <li key={file.id}><DownloadPopup fullUpload={model} file={file} /> <span className="ext">{file.extension}</span> <span className="nic">{file.nicName}</span></li>;
            })}
          </ul>
          <ExternalLink href={model.url} text="@ccMixter" />
        </div>
      );
  }
});

var pells = React.createClass({
  render() {
    var store = this.props.store;
    return (
      <div className="container pells-page">
        <div className="gear">{"filter gadget here"}</div>
        <PellHeader store={store} />
        <div className="row">
          <div className="col-md-2 pell-paging">
            <Paging store={store} disableBumping />
          </div>
          <div className="col-md-7 pell-browser">
            <PellTabs store={store} />
            <div className="tab-content">
              <PellListing store={store} />
            </div>
          </div>
          <div className="col-md-3 pell-detail">
            <PellDetail store={store} />
          </div>
        </div>
      </div>
    );      
  },

});

pells.title = 'A Cappella Browser';

pells.path = '/pells';

pells.store = function(params,queryParams) {
  var qparams = mergeParams( {}, qc.pells, queryParams );
  return Acappellas.storeFromQuery(qparams);
};

module.exports = pells;

