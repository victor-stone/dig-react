import React        from 'react';

import UserSearch   from '../../stores/user-search';

import Filter       from '../../models/filters/artist';
import LookupFilter from '../../models/filters/lookup';

import PropertyState from '../properties/mixins/property-state';

import LookupInput    from './lookup-input';
import LookupResults  from './lookup-results';

import PeopleList     from '../models/people-list';

class PeopleFilterList extends React.Component
{
  constructor() {
    super(...arguments);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(model) {
    this.props.onSelect(model.id);
  }

  render() {
    return <PeopleList fancy thumb onNavigate={this.onSelect} {...this.props} />;
  }
}

class PeopleFilter extends PropertyState(React.Component)
{
  constructor() {
    super(...arguments);

    // hook user selection of an artist

    this.property.onChange( this.onSelected.bind(this) );

    // we'll use this store to do lookups

    this.search = new UserSearch({ remixmin:1 });
    this.lookupFilter = this.search.addProperty(LookupFilter);

    // intialize with the current selected user

    this.lookupFilter.value = this.property.value;
  }

  onSelected(property) {

    // sync the edit field with the selected name    
    
    this.lookupFilter.value = property.value;
  }

  render() {
    return (
      <div className="people-filter" >
          <LookupInput store={this.search} placeholder="artist name" />
          <LookupResults store={this.search} ListElement={PeopleFilterList} onSelect={this.updateValue} />
      </div>
      );
  }
}

PeopleFilter.defaultProps = {
  property: Filter
};

module.exports = PeopleFilter;

//

//