import QueryFilter  from '../query-filter';

class MatchAll extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'type';
    this._displayName = 'match all';
    this._defaultValue = 'any';
  }

  fromAbstract(val) {
    return val ? 'all' : 'any';
  }

  toAbstract() {
    return this._value === 'all';
  }
  
  get isDirty() {
    // does not participate in 'reset'
    return false; 
  }
}

MatchAll.propertyName = 'matchAll';

module.exports = MatchAll;