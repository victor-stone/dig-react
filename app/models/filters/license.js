import QueryFilter  from '../query-filter';

class License extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'lic';
    this._displayName = 'License';
  }
}

Object.assign(License,{
  filterName: 'license',
  
  fromQueryParams(qp) {
    const filter = new License();
    filter.aquireFromQueryParams(qp);
    filter._defaultValue = filter._value;
    return filter;    
  },

  options: {
      all: 'all licenses',
      open: 'free for commercial use',
      ccplus: 'royalty free ccPlus license'
    }
});

module.exports = License;