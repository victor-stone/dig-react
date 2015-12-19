import React     from 'react';
import Query     from '../stores/query';

import { QueryParamTracker,
         DefaultParamTracker,
         DirtyParamTracker }   from '../mixins';

import SearchBox              from './SearchBox';

const ArtistList = React.createClass({

  getInitialState: function() {
    return { search: this.props.search, artists: [] };
  },

  componentWillMount: function() {
    this.query = new Query();
    this.getArtists();
  },

  componentWillReceiveProps: function(props) {
    this.setState( { search: props.search }, () => this.getArtists() );
  },

  getArtists: function() {
    if( this.state.search ) {
      this.query.lookUpUsers( this.state.search, { remixmin: 1 } )
        .then( artists => this.setState( { artists } ) );
    } else {
      this.setState( { artists: [] } );
    }
  },

  artistSelect: function(a) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.props.artistSelect(a);
    };
  },

  render: function() {
    return (
      <ul className="artist-list">
        {this.state.artists.map( a => <li key={a.id} onClick={this.artistSelect(a)}>{a.name}</li>)}
      </ul>
      );
  }  
});

const ArtistFilter = React.createClass({

  mixins: [QueryParamTracker, DirtyParamTracker, DefaultParamTracker],

  stateFromParams: function(queryParams) {
    var val = queryParams.u || null;
    return { u: val, propValue: val };
  },

  onAreParamsDirty: function(queryParams,defaults,isDirty) {
    if( !isDirty.isDirty) {
      isDirty.isDirty = !!queryParams.u;
    }
  },

  onGetParamsDefault: function(queryParams) {
    queryParams.u = null;
  },

  filter: function(u, isIcon, filterCB) {
    
    var kill = function() {
      this.setState( { u: null }, () => this.applyHardParams( { u: null } ) );
    }.bind(this);

    if( isIcon ) {
      filterCB('');
      kill();
    } else if( u && u.length > 0 ) {
      this.setState( { u } );
    } else {
      kill();
    }
  },

  artistSelect: function(a) {
    this.applyHardParams( { u: a.id } );
    this.refs['edit'].setState( { value: a.id } );
  },

  render: function() {
    return (
      <div className="artist-filter" >
          <SearchBox icon="times" ref="edit" placeholder="artist name" submitSearch={this.filter}  anyKey />
          <ArtistList store={this.props.store} artistSelect={this.artistSelect} search={this.state.u} />
      </div>
      );
  }
});

module.exports = ArtistFilter;

//