import QueryFilter  from '../query-filter';

class Artist extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'user';
    this._displayName = 'Artist';
  }

  get isDirty() {
    // does not participate in 'reset'
    return false; 
  }
}

Object.assign(Artist,{
  filterName: 'artist',
  
  fromQueryParams(qp) {
    const filter = new Artist();
    filter._defaultValue = '';
    filter._propName = 'u' in qp ? 'u' : 'user';
    filter.aquireFromQueryParams(qp);
    return filter;    
  }
});

module.exports = Artist;