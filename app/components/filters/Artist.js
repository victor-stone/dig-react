import React      from 'react';
import Query      from '../../stores/query';
import Filter     from '../../models/filters/artist';

import SearchBox   from '../SearchBox';

import { bindAll } from '../../unicorns';

class ArtistList extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onValueChange' ); 
    this.filter = this.props.store.addOrGetFilter(Filter);
    this.filter.onChange( this.onValueChange );
    this.state = { artists: [] };
  }

  componentWillMount() {
    this.query = new Query();
    this.getArtists(this.filter.value);
  }

  getArtists(search) {
    if( this.query && search ) {
      this.query.lookUpUsers( search, { remixmin: 1 } )
        .then( artists => this.setState( { artists } ) );
    } else {
      this.setState( { artists: [] } );
    }
  }

  onValueChange(filter) {
    this.getArtists(filter.value);
  }

  artistSelect(a) {
    return () => this.filter.value = a;
  }

  _fancyName(a) {
    const { id, name } = a;
    return id === name ? id : `${name} (${id})`;
  }

  render() {
    const { artists } = this.state;

    if( !artists.length ) {
      return null;
    }

    return (
      <ul className="artist-list">
        {artists.map( a => <li key={a.id} onClick={this.artistSelect(a.id)}>{this._fancyName(a)}</li>)}
      </ul>
      );
  }  
}

class ArtistFilter extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onSubmitSearch', 'onValueChange' ); 
    this.filter = this.props.store.addOrGetFilter(Filter);
    this.filter.onChange( this.onValueChange );
    this.state = { u: this.filter.value  };
  }

  onValueChange(filter) {
    this.setState( { u: filter.value } );
  }

  _kill() {
    this.filter.value = this.filter.defaultValue;
  }

  onSubmitSearch(u, isIcon, filterCB) {
    
    if( isIcon ) { // user clicked on [x]
      filterCB('');
      this._kill();
    } else if( u && u.length > 0 ) {
      this.filter.value = u;
    } else {
      this._kill();
    }
  }

  render() {
    const { u } = this.state;
    return (
      <div className="artist-filter" >
          <SearchBox icon="times" ref="edit" defaultValue={u} placeholder="artist name" submitSearch={this.onSubmitSearch} anyKey />
          <ArtistList store={this.props.store} />
      </div>
      );
  }
}

module.exports = ArtistFilter;

//