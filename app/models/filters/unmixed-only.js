import QueryFilter  from '../query-filter';

class UnmixedOnly extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'remixmax';
    this._displayName = 'unmixed only';
  }

  fromAbstract(val) {
    return val ? '0' : '' ;
  }

  toAbstract() {
    return this._value === '0';
  }

  get isDirty() {
    return this.value; // true means value is 'on' and dirty
  }
}

UnmixedOnly.propertyName = 'UnmixedOnly';

module.exports = UnmixedOnly;