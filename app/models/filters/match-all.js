import QueryFilter        from '../query-filter';
import PropertyTranslator from '../property-translator';

class MatchAll extends PropertyTranslator(QueryFilter)
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

Object.assign( MatchAll, {
  propertyName : 'type',
});

module.exports = MatchAll;