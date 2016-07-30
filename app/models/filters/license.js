import QueryFilter  from '../query-filter';

class License extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'lic',
    this._displayName = 'License';
    this._setsDefaultFromNative = true;
  }
}

Object.assign(License,{
  propertyName: 'lic',
  
  options: {
      all: 'all licenses',
      open: 'free for commercial use',
      ccplus: 'royalty free ccPlus license'
    }
});
module.exports = License;