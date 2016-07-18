import QueryFilter  from '../query-filter';

class Lookup extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'lookup';
    this._displayName = 'Look up';
  }

  get isDirty() {
    // does not participate in 'reset'
    return false; 
  }
}

Lookup.propertyName = 'lookup';

module.exports = Lookup;