import QueryFilter  from '../query-filter';

class Artist extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'user';
    this._displayName = 'Artist';
  }
}

Object.assign(Artist,{
  filterName: 'artist',
  
  fromQueryParams(qp) {
    const filter = new Artist();
    filter._propName = 'u' in qp ? 'u' : 'user';
    filter.aquireFromQueryParams(qp);
    filter._defaultValue = filter._value;
    return filter;    
  }
});

module.exports = Artist;