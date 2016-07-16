import QueryFilter  from '../query-filter';

class UnmixedOnly extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'remixmax';
    this._displayName = 'unmixed only';
  }

  set value(val) {
    super.value = val ? '0' : '' ;
  }

  get value() {
    return this._value === '0';
  }

  get isDirty() {
    return this.value; // true means value is 'on' and dirty
  }
}

Object.assign(UnmixedOnly,{
  filterName: 'UnmixedOnly',
  
  fromQueryParams(qp) {
    const filter = new UnmixedOnly();
    filter._defaultValue = '';
    filter.aquireFromQueryParams(qp);
    return filter;    
  }
});

module.exports = UnmixedOnly;