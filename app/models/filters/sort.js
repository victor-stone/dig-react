import QueryFilter  from '../query-filter';
import qc           from '../query-configs';

class Sort extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'digrank';
    this._displayName = 'Sort';
  }
}

Object.assign(Sort,{
  filterName: 'Sort',
  
  fromQueryParams(qp) {
    const filter = new Sort();
    filter.aquireFromQueryParams(qp);
    filter._defaultValue = filter._value;
    return filter;    
  },

  options: {
      [qc.magicSort.digrank]: 'magic sort',
      [qc.recent.digrank   ]: 'recent    ',
      [qc.alltime.digrank  ]: 'all time  ',
      [qc.latest.digrank   ]: 'latest    ',
  }
});

module.exports = Sort;