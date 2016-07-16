import Eventer from '../services/eventer';
import events  from './events';

/*
  A QueryFilter is the mapper between an abstract filtering on a Collection store
  and the actual query parameters required to perform the filtering.

  Derivations present abstract values (e.g. true|false for InstrumentalOnly, 
  or a numeric value for BPM) and the QueryFilter derivation will translate that
  to specific ccMixter Query API parameters such as 'reqtags=-vocals,instrumental'
  and 'tags=bpm_100_105'

  Specific UI controls instantiate specific QueryFilters and push them into 
  a Collection store which is aware of the base class abstractions.

  Internals: 
    The value of '_value' is the actual value of the query parameter. Derivations
    should use the 'value' setter/getter to do translation to and from the abstracted 
    value. 


*/
class QueryFilter extends Eventer
{
  constructor() {
    super();
    this._defaultValue        = null;
    this._value               = undefined;
    this._propName            = '_unnamed_';
    this._displayName         = '_Un-Named_';
    this._requiresFullRefresh = true;
  }

  get displayName() {
    return this._displayName;
  }

  /*
    The store will use this flag to determine whether the 
    entire model needs to be flushed and refreshed or just
    pieces of it.
  */
  get requiresFullRefresh() {
    return this._requiresFullRefresh;
  }
  
  get isDirty() {
    return this._value !== this._defaultValue;
  }

  get defaultValue() {
    return this._defaultValue;
  }

  reset() {
    this.value = this._defaultValue;
    return this;
  }

  /*
    The value of '_value' is the actual value of the query parameter. Derivations
    use the 'value' setter/getter to do translation to and from the abstracted 
    value. 
  */
  get value() {
    return this._value;
  }

  /*
    UI Controls use this setter to signal that the user wants to change 
    the filter.
  */
  set value(val) {
    this._value = val;
    this.onChange();
  }

  onChange(listener) {
    if( typeof listener === 'undefined') {
      this.emit( events.QUERY_FILTER_CHANGED, this );
    } else {
      this.on( events.QUERY_FILTER_CHANGED, listener );
    }
    return this;
  }

  off(listener) {
    this.removeListener( events.QUERY_FILTER_CHANGED, listener );
    return this;
  }

  /*
    This is the name of the queryParam that will be the target
    of the value. This is only used in applyToQueryParams and
    aquireFromQueryParams so if a derived class overrides those
    methods then this property has no affect.
  */
  get name() {
    return this._propName;
  }

  /*
    Derivations with special handling requirements (like tags)
    override this method to massage the value into the
    queryParams.
  */
  applyToQueryParams(qp) {
    qp[this.name] = this._value;
    return this;
  }

  aquireFromQueryParams(qp) {
    ({ [this.name]:this._value = this._defaultValue } = qp);
    return this;
  }
}

module.exports = QueryFilter;