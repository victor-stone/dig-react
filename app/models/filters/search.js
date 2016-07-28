import QueryFilter  from '../query-filter';

class Search extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'searchp';
    this._displayName = 'Search';
  }

  reset() {
    this.value = '';
  }

  get isDirty() {
    return false; // never need to 'reset'
  }
}

Search.propertyName = 'search';

module.exports = Search;