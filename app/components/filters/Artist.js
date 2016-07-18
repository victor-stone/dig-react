import React        from 'react';
import UserSearch   from '../../stores/user-search';
import Filter       from '../../models/filters/artist';
import LookupFilter from '../../models/filters/lookup';
import events       from '../../models/events';

import SearchBox   from '../SearchBox';

import { bindAll } from '../../unicorns';

class ArtistList extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onValueChange' ); 
    this.lookupFilter = this.props.store.addProperty(LookupFilter);
    this.lookupFilter.onChange( this.onValueChange );
    this.state = { artists: [] };
  }

  getArtists(search) {
    if( search ) {
      this.props.store.lookUpUsers( search )
        .then( artists => this.setState( { artists } ) );
    } else {
      this.setState( { artists: [] } );
    }
  }

  onValueChange(filter) {
    this.getArtists(filter.value);
  }

  artistSelect(a) {
    return () => {this.props.onUserSelect(a); this.lookupFilter.value = a;};
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
      <ul className="artist-list form-control">
        {artists.map( a => <li key={a.id} onClick={this.artistSelect(a.id)}>{this._fancyName(a)}</li>)}
      </ul>
      );
  }  
}

class ArtistFilter extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onSubmitSearch', 'onModelUpdated', 'onUserSelect'); 

    // This is the preview store

    this.previewFilter = this.props.store.addProperty(Filter);

    this.state = { u: this.previewFilter.value  };

    // This is our search store

    this.search = new UserSearch({ remixmin:1 });
    this.lookupFilter = this.search.addProperty(LookupFilter);
    this.search.on( events.MODEL_UPDATED, this.onModelUpdated );
  }


  // The user is typing in our edit, field
  // send the text to the search list

  onSubmitSearch(partialArtistName, userCancelledSearch, filterCB) {
    
    if( userCancelledSearch ) { 
      filterCB('');
      this._kill();
    } else if( partialArtistName && partialArtistName.length > 0 ) {
      this.lookupFilter.value = partialArtistName;
    } else {
      this._kill();
    }
  }

  // user selected an artist
  //
  onUserSelect(u) {
    this.setState({ u });
  }

  // The search list updated  
  // 
  onModelUpdated(model) {
    
    const [ {id} = {id:0} ] = model.items;

    if( id ) {
      this.previewFilter.value !== id && (this.previewFilter.value = id);
    } else {
      this._kill();
    }
  }

  _kill() {
    this.previewFilter.value = this.previewFilter.defaultValue;
    this.lookupFilter.value  = this.lookupFilter.defaultValue;
  }

  render() {
    const { u } = this.state;
    return (
      <div className="artist-filter" >
          <SearchBox icon="times" value={u} placeholder="artist name" submitSearch={this.onSubmitSearch} anyKey />
          <ArtistList store={this.search} onUserSelect={this.onUserSelect} />
      </div>
      );
  }
}

module.exports = ArtistFilter;

//