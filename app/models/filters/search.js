import QueryFilter  from '../query-filter';

class Search extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'searchp';
    this._displayName = 'Search';
  }

  get isDirty() {
    return false; // never need to 'reset'
  }
}

Object.assign(Search,{
  filterName: 'search',
  
  fromQueryParams(qp) {
    const filter = new Search();
    filter._defaultValue = '';
    filter.aquireFromQueryParams(qp);
    return filter;    
  }

});

module.exports = Search;