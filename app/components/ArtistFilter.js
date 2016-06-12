import React      from 'react';
import Query      from '../stores/query-basic';

import { QueryParamTracker,
         DefaultParamTracker,
         DirtyParamTracker }   from '../mixins';

import SearchBox               from './SearchBox';
import { debounce }            from '../unicorns';

const SEARCH_DEBOUNCE = 800;

const ArtistList = React.createClass({

  getInitialState: function() {
    return { search: this.props.search, artists: [] };
  },

  componentWillMount: function() {
    this.query = new Query();
    this.getArtists();
  },

  componentWillReceiveProps(props) {
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

  artistSelect(a) {
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

  stateFromParams(queryParams) {
    var val = queryParams.u || null;
    return { u: val, propValue: val };
  },

  onAreParamsDirty(queryParams,defaults,isDirty) {
    if( !isDirty.isDirty) {
      isDirty.isDirty = !!queryParams.u;
    }
  },

  onGetParamsDefault(queryParams) {
    queryParams.u = null;
  },

  triggerSearch: debounce( function(u) {
    this.setState( {u} );
  }, SEARCH_DEBOUNCE ),

  filter(u, isIcon, filterCB) {
    
    var kill = function() {
      this.setState( { u: null }, () => this.refreshModel( { u: null } ) );
    }.bind(this);

    if( isIcon ) {
      filterCB('');
      kill();
    } else if( u && u.length > 0 ) {
      //this.triggerSearch(this,u);
      this.setState( {u} );
    } else {
      kill();
    }
  },

  artistSelect(a) {
    this.refreshModel( { u: a.id } );
    this.refs['edit'].setState( { value: a.id } );
  },

  render: function() {
    return (
      <div className="artist-filter" >
          <SearchBox icon="times" ref="edit" defaultValue={this.state.u} placeholder="artist name" submitSearch={this.filter}  anyKey />
          {this.state.u
            ? <ArtistList store={this.props.store} artistSelect={this.artistSelect} search={this.state.u} />
            : null
          }
      </div>
      );
  }
});

module.exports = ArtistFilter;

//