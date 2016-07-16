import QueryFilter  from '../query-filter';

class Limit extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'limit';
    this._displayName = 'Limit';
  }
}

Object.assign(Limit,{
  filterName: 'limit',
  
  fromQueryParams(qp) {
    const filter = new Limit();
    filter.aquireFromQueryParams(qp);
    filter._defaultValue = filter._value;
    return filter;    
  }
});

module.exports = Limit;