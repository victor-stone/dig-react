import Property           from './property';
import PropertyStateful   from './property-stateful';

/*
  A QueryFilter is a Property that maps between an abstract filtering on a Collection store
  and the actual query parameters required to perform the filtering.

  Derivations present abstract values (e.g. true|false for InstrumentalOnly, 
  or a numeric value for BPM) and the QueryFilter derivation will translate that
  to specific query parameters such as '?reqtags=-vocals,instrumental'
  and '?tags=bpm_100_105'

  Specific UI controls instantiate specific QueryFilters and push them into 
  a Collection store which is aware of the base class abstractions.

  Internals: 
    The value of '_value' is the actual value of the query parameter. Derivations
    should use the 'value' setter/getter to do translation to and from the abstracted 
    value. 
*/

class QueryFilter extends PropertyStateful(Property)
{
  constructor() {
    super(...arguments);
    this._requiresFullRefresh = true;
    this._defaultValue === null && (this._defaultValue = '');
  }

  onlyHashIfDirty() {
    return false;
  }
  
  allowStringify() {
    return true;
  }
  
  /*
    The store will use this flag to determine whether the 
    entire model needs to be flushed and refreshed or just
    pieces of it.
  */
  get requiresFullRefresh() {
    return this._requiresFullRefresh;
  }
}

module.exports = QueryFilter;