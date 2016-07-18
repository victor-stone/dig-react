import React        from 'react';
import PeopleList   from '../models/PeopleList';
import LookupFilter from '../../models/filters/lookup';

import { bindAll }  from '../../unicorns';

/*
  Watches the value of the Lookup filter and displays 
  a list of users/artist/people (ugh) that matches
  that.
*/
class ArtistSearchList extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onValueChange', 'onSelect' ); 
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

  onSelect(model) {
    const { id } = model;
    this.props.onUserSelect(id); 
    this.lookupFilter.value = id;
  }

  render() {
    const { artists } = this.state;

    if( !artists.length ) {
      return null;
    }

    const props = {
      model: artists,
      listClass: 'artist-list form-control',
      onNavigate: this.onSelect
    };

    return (
      <PeopleList {...props} thumb fancy />
      );
  }  
}

module.exports = ArtistSearchList;

//