import React            from 'react';
import qc               from '../models/query-configs';
import Acappellas       from '../stores/acappellas';
import Query            from '../stores/query';

import {  Glyph,
          DownloadPopup,
          QueryOptions,
          Link,
          Paging  }       from '../components';
import { ExternalLink }   from '../components/ActionButtons';
import { mergeParams,
         TagString }      from '../unicorns';
import AudioPlayerService from '../services/audio-player';

import { PlaylistUpdater,
         NowPlayingTracker, 
         QueryParamValue,
         QueryParamTagsRotate } from '../mixins';

const NOMINAL_TIMEOUT = 40;

var PellTabs = React.createClass({

  mixins: [PlaylistUpdater,QueryParamTagsRotate],

  queryParam: {
    name: 'reqtags',
    filter: /^(featured|spoken_word|rap|melody)$/,
    clean: true,
    avoidInitConflict: true
  },

  stateFromStore: function(store) {
    var tag;
    var totals = store.model.totals;
    if( this.state && this.state.tag && !totals[this.state.tag] ) {
      setTimeout( () => this.setStateAndPerform( {tag:''} ), NOMINAL_TIMEOUT );
    }
    var tags = store.model.queryParams.reqtags;
    tag = TagString.filter(tags,this.queryParam.filter).toString();
    return { totals, tag };
  },

  onFilter: function(filter) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.performQuery(filter === 'all' ? '' : filter);
    };
  },

  checkActive: function(filter) {
    var tag = this.state.tag || 'all';
    return filter === tag ? 'active' : '';
  },

  render: function() {
    var totals = this.state.totals;

    return (
      <ul className="nav nav-tabs">
        {totals.featured
          ? <li className={this.checkActive('featured')} ><a href="#" onClick={this.onFilter('featured')}>{"featured "}<span className="badge">{totals.featured}</span></a></li>
          : null
        }
        <li className={this.checkActive('all')}><a href="#" id="allpellstab" onClick={this.onFilter('all')}>{"all "}<span className="badge">{totals.all}</span></a></li>
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

  mixins: [PlaylistUpdater,QueryParamValue],

  queryParam: {
    name: 'u',
    initValue: '',
    clean: true,
    avoidInitConflict: true
  },

  stateFromStore: function(store) {
    var playlist = store.model.playlist;
    var artist   = store.model.artist;
    var u        = artist && artist.id;
    this.queryParam.initValue = u; // hack to prevent from being cleared
    return { playlist, artist, u };
  },

  selectLine: function(pell) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      AudioPlayerService.togglePlay(pell);
    };
  },

  render: function() {

    function pellLine(pell) {

      var args = [ 'li', 
                { className: 'pell', key: pell.id } ];

      if( pell.bpm ) {
        var e = React.createElement('span', { className: 'bpm' }, 'bpm: ', pell.bpm);
        args.push(e); 
      }

      var e1 = React.createElement('span', { className: 'title',onClick: this.selectLine(pell) }, pell.name);
      args.push(e1);

      if( !artist ) {
        var e2 = React.createElement(Link, 
                                    { href: '/pells?u=' + pell.artist.id }, 
                                      pell.artist.name);
        var e3 = React.createElement('span', { className: 'artist' }, e2 );
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

var PellsUserSearch = React.createClass({

  getInitialState: function() {
    return { users: [] };
  },

  componentWillMount: function() {
    this.doSearch(this.props.searchTerm);
  },

  componentWillReceiveProps( nextProps ) {
    this.doSearch( nextProps.searchTerm );
  },

  doSearch: function(text) {
    var query = new Query();
    query.searchUsers({
      limit: 6, uploadmin: 1, searchp: text
    }).then( users => this.setState({users}));
  },

  render: function() {

    var users = this.state.users;
    var cls   = 'user-search-results' + (users.length ? '' : ' hidden');

    return (
        <div className={cls}>
          {users.map( u => <Link key={u.id} href={'/pells?u=' + u.id} ><Glyph icon="user"/> {u.name}</Link> )}
        </div>
      );
  }

});

var PellHeader = React.createClass({

  mixins: [PlaylistUpdater],

  stateFromStore: function(store) {

    return { artist: store.model.artist,
             searchTerm: store.model.queryParams.searchp };    
  },

  render: function() {
    var searchTerm = this.state.searchTerm;    
    var artist     = searchTerm ? null : this.state.artist;

    var content = null;

    if( searchTerm ) {
      content = <div><h2><Link href="/pells" ><Glyph icon="chevron-circle-left" />{" clear search"}</Link> <small><Glyph icon="search" />{" search "}</small>{searchTerm}</h2><PellsUserSearch searchTerm={searchTerm} /></div>;
    } else if( artist ) {
      content = <h2><Link href="/pells" ><Glyph icon="chevron-circle-left" />{" everybody"}</Link> <img src={artist.avatarURL} />{artist.name}</h2>;
    } else {
      content = <h1><Glyph icon="microphone" />{" Pells"}</h1>;
    }

    return (
        <div className="page-header center-text">
        {content}
        </div>
      );
  }

});

var PellDetail = React.createClass({

  mixins: [NowPlayingTracker],

  render: function() {

    var model  = this.state.nowPlaying;
    var cls    = 'pell-detail' + (model ? '' : ' hidden');

    return (
        <div className={cls}>
        {model
          ?<div>
            <h3>{model.name}</h3>
            <ul className="download-list">
              {model.files.map( file => {
                return <li key={file.id}><DownloadPopup fullUpload={model} file={file} /> <span className="ext">{file.extension}</span> <span className="nic">{file.nicName}</span></li>;
              })}
            </ul>
            <ExternalLink className="ccm-link" href={model.url} text="@ccMixter" />
          </div>
          : null
        }
        </div>
      );
  }
});

var pells = React.createClass({

  render() {
    var store = this.props.store;
    return (
      <div className="container pells-page">
        <div className="filter-box-position">
          <QueryOptions store={store} />
        </div>
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
          <div className="col-md-3">
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
  var featured = ('searchp' in queryParams) || ('u' in queryParams) ? {} : qc.pellsFeatured;
  var qparams = mergeParams( {}, qc.pells, queryParams, featured );
  return Acappellas.storeFromQuery(qparams);
};

module.exports = pells;

