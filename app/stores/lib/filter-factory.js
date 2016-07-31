import { quickLoop }   from 'unicorns';

import makeQueryFilter from '../../models/query-filter-make';
import FilterVisibility from './filter-visibility';

/*
*/
class FilterFactory 
{
  constructor({ filters = [], alwaysHide = [], hideOnDefault = [] }) {
    
    this._filters       = new Map();
    this._alwaysHide    = alwaysHide;
    this._hideOnDefault = hideOnDefault;
    this._visibility    = new Map();

    quickLoop( Object.keys(filters), key => this._filters.set( filters[key].propertyName, filters[key] ) );
  }

  visibility( propName ) {

    if( !this._visibility.has( propName ) ) {

      const visibility = this._alwaysHide.contains( propName )
              ? FilterVisibility.HIDDEN
              : this._hideOnDefault.contains( propName )
                ? FilterVisibility.HIDDEN_ON_DEFAULT
                : FilterVisibility.VISIBLE;

      this._visibility.set( propName, new FilterVisibility( visibility ) );
    }
    
    return this._visibility.get( propName );
  }

  makeFilter( propName ) {
    
    if( this._filters.has(propName) ) {
      return this._filters.get(propName);
    }

    return makeQueryFilter({ propName });
  }
}

module.exports = FilterFactory;
