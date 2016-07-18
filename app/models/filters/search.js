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

Search.propertyName = 'search';

module.exports = Search;