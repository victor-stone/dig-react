import Properties from './properties';
import QueryFilter from '../../models/query-filter';
import { quickLoop } from 'unicorns';
/*
  The default onPropertyChange assumes:

    refresh()
*/
const QueryFilters = target => class extends Properties(target) {

  get queryParams() {
    return {};
  }

  get queryFilters() {
    return Array.from(this._properties.entries()).filter( ([,f]) => f instanceof QueryFilter );
  }

  refreshModel() {
    return this.refresh();
  }

  set isFilterEventsDisabled(val) {
    this._ignoreFilterEvent = val;
  }

  get isFilterEventsDisabled() {
    return this._ignoreFilterEvent;
  }

  onPropertyChange(filter) {
    if( this._ignoreFilterEvent ) {
      return;
    }
    if( filter.requiresFullRefresh ) {
      this.refreshModel();
    } else {
      this.refresh();
    }
  }

  paramsDirty() {
    return this.queryFilters.find( f => f.isDirty ) !== undefined;
  }

  applyDefaults() {
    this._ignoreFilterEvent = true;
    quickLoop( this.queryFilters, filter => filter.isDirty && filter.reset() );
    this._ignoreFilterEvent = false;
    return this.refreshModel();
  }

  setPropertyValue( PropertyClassOrName, val ) {
    this._ignoreFilterEvent = true;
    this.getProperty(PropertyClassOrName).value = val;
    this._ignoreFilterEvent = false;
  }
};

module.exports = QueryFilters;
