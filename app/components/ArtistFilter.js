import React      from 'react';
import Query      from '../stores/query';

import { QueryParamTracker }   from '../mixins';

import SearchBox               from './SearchBox';

import { bindAll } from '../unicorns';

class ArtistList extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = this._stateFromProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState( this._stateFromProps(props) );
  }

  _stateFromProps(props) {
    return { artists: props.model };
  }

  artistSelect(a) {
    return e => {
      e.preventDefault();
      e.stopPropagation();
      this.props.artistSelect(a);
    };
  }

  _fancyName(a) {
    const { id, name } = a;
    return id === name ? id : `${name} (${id})`;
  }

  render() {
    const { artists } = this.state;

    return (
      <ul className="artist-list">
        {artists.map( a => <li key={a.id} onClick={this.artistSelect(a)}>{this._fancyName(a)}</li>)}
      </ul>
      );
  }  
}

class ArtistFilter extends QueryParamTracker(React.Component)
{
  constructor() {
    super(...arguments);
    bindAll( this, 'filter', 'artistSelect' ); 
  }

  componentWillMount() {
    this.query = new Query();
    this.getArtists(this.state.u);
  }

  getArtists(search) {
    if( search ) {
      this.query.lookUpUsers( search, { remixmin: 1 } )
        .then( artists => this.setState( { artists, u: search }, () => this.artistSelect(artists.length === 1 && artists[0]) ) );
    } else {
      this.setState( { artists: [], u: '' } );
    }
  }

  stateFromParams(queryParams) {
    const { u = null } = queryParams;
    return { u };
  }

  onAreParamsDirty(queryParams,defaults,isDirty) {
    if( !isDirty.isDirty) {
      isDirty.isDirty = !!queryParams.u;
    }
  }

  onGetParamsDefault(queryParams) {
    queryParams.u = null;
  }

  filter(u, isIcon, filterCB) {
    
    var kill = function() {
      this.setState( { u: null, artists: [] }, () => this.refreshModel( { u: null } ) );
    }.bind(this);

    if( isIcon ) {
      filterCB('');
      kill();
    } else if( u && u.length > 0 ) {
      //this.triggerSearch(this,u);
      this.getArtists(u);
    } else {
      kill();
    }
  }

  artistSelect(a) {
    if( a ) {
      this.refreshModel( { u: a.id } );
      this.refs.edit.setState({value:a.id});
    } else {
      this.refreshModel( {u:null} );
    }
  }

  render() {
    const { artists = [], u } = this.state;
    return (
      <div className="artist-filter" >
          <SearchBox icon="times" ref="edit" defaultValue={u} placeholder="artist name" submitSearch={this.filter} anyKey />
          {!!artists.length && <ArtistList artistSelect={this.artistSelect} model={artists} />}
      </div>
      );
  }
}

module.exports = ArtistFilter;

//