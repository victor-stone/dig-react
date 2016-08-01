import { quickLoop }   from 'unicorns';

import makeQueryFilter from '../../models/query-filter-make';

/*
*/
class FilterFactory 
{
  constructor({ filters = [] }) {
    
    this._filters       = new Map();

    quickLoop( Object.keys(filters), key => this._filters.set( filters[key].propertyName, filters[key] ) );
  }

  makeFilter( propName ) {
    
    if( this._filters.has(propName) ) {
      return this._filters.get(propName);
    }

    return makeQueryFilter({ propName });
  }
}

module.exports = FilterFactory;
