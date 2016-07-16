import QueryFilter  from '../query-filter';

class MatchAll extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'type';
    this._displayName = 'match all';
  }

  set value(val) {
    super.value = val ? 'all' : 'any';
  }

  get value() {
    return this._value === 'all';
  }
}

Object.assign(MatchAll,{
  filterName: 'matchAll',
  
  fromQueryParams(qp) {
    const filter = new MatchAll();
    filter._defaultValue = 'any';
    filter.aquireFromQueryParams(qp);
    return filter;    
  }
});

module.exports = MatchAll;