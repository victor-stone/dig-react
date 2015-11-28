import React              from 'react';
import Query              from '../stores/query';
import Glyph              from './Glyph';
import DownloadPopup      from './DownloadPopup';
import Link               from './Link';
import ActionButtons      from './ActionButtons';
import AudioPlayerService from '../services/audio-player';

import { ModelTracker,
         NowPlayingTracker, 
         QueryParamTracker } from '../mixins';

var ExternalLink = ActionButtons.ExternalLink;

//const NOMINAL_TIMEOUT = 40;

var PellTabs = React.createClass({

  mixins: [ModelTracker,QueryParamTracker],

  filter: /^(featured|spoken_word|rap|melody)$/,

  stateFromStore: function(store) {
    var totals = store.model.totals;
    /*
    if( this.state && this.state.tag && !totals[this.state.tag] ) {
      setTimeout( () => this.setStateAndPerform( {tag:''} ), NOMINAL_TIMEOUT );
    }
    */
    return { totals };
  },

  stateFromParams: function(queryParams) {
    var tag = queryParams.reqtags.fiter(this.filter).toString();
    return { tag };
  },

  onFilter: function(filter) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      var tag     = filter === 'all' ? '' : filter;
      var qptags  = this.props.store.queryParams.reqtags;
      var reqtags = qptags.replace( this.state.tag, tag );
      this.applyHardParams( { reqtags } );
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

  mixins: [ModelTracker],

  stateFromStore: function(store) {
    return { model: store.model };
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

    var playlist = this.state.model.playlist;
    var artist   = this.state.model.artist;
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

  mixins: [ModelTracker],

  stateFromStore: function(store) {

    return { artist: store.model.artist,
             searchTerm: store.model.queryParams.searchp };    
  },

  render: function() {
    var searchTerm = this.state.searchTerm;    
    var artist     = searchTerm ? null : this.state.artist;

    var content = null;

    if( searchTerm ) {
      content = (<div>
                  <h2>
                    <Link href="/pells" >
                      <Glyph icon="chevron-circle-left" />
                      {" clear search"}
                    </Link> 
                    <small>
                      <Glyph icon="search" />
                      {" search "}
                    </small>
                    {searchTerm}
                  </h2>
                  <PellsUserSearch searchTerm={searchTerm} />
                </div>);
    } else if( artist ) {
      content = (<h2>
                  <Link href="/pells" >
                    <Glyph icon="chevron-circle-left" />
                    {" everybody"}
                  </Link> 
                  <img src={artist.avatarURL} />
                  {artist.name}
                </h2>);
    } else {
      content = (<h1>
                  <Glyph icon="microphone" />
                  {" Pells"}
                </h1>);
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

  getInitialState: function() {
    return this.onNowPlayingState();
  },

  onNowPlayingState: function() {
    return { show: 'listing'};    
  },

  showListing: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState( {show: 'listing'} );
  },

  showDetails: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState( {show: 'details'} );    
  },

  checkActive: function(mode) {
    return( this.state.show === mode ? 'active' : '' );
  },

  renderListing: function(model) {
    return (<ul className="download-list">
        <li>
          <span className="name">{model.name}</span>
        </li>
        <li>
          <Link className="artist" href={'/pells?u='+model.artist.id}>{model.artist.name}</Link>
        </li>
        {model.files.map( file => {
          return <li className="dl-list" key={file.id}><DownloadPopup btnClass="sm-download" fullUpload={model} file={file} /> <span className="ext">{file.extension}</span> <span className="nic">{file.nicName}</span></li>;
        })}
        <li>
          <ExternalLink className="ccm-link pell-detail-foot" href={model.url} text="@ccMixter" />
        </li>
      </ul>);
  },

  renderDetail: function(model) {
    return (<pre className="pell-detail-description">{model.description}</pre>);
  },

  render: function() {

    var model       = this.state.nowPlaying;
    var cls         = 'pell-detail' + (model ? '' : ' hidden');
    var showListing = this.state.show === 'listing';
    var element     = model ? (showListing ? this.renderListing(model) : this.renderDetail(model)) : null;

    return (
        <div className={cls}>
        {model
          ? <div> 
              <ul className="nav nav-tabs">
                <li className={this.checkActive('listing')} >
                  <a href="#"  onClick={this.showListing}><Glyph icon="folder" />{" files"}</a>
                </li>
                <li className={this.checkActive('details')} >
                  <a href="#" onClick={this.showDetails}><Glyph icon="info-circle" />{" details"}</a>
                </li>
              </ul>
              <div className="tab-content">
              {element}
              </div>
            </div>
          : null
        }
        </div>
      );
  }
});


module.exports = {
  PellDetail,
  PellHeader,
  PellsUserSearch,
  PellListing,
  PellTabs
};

