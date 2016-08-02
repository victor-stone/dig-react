import QueryFilter  from '../query-filter';

class Featured extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'type';
    this._displayName = 'featured';
  }

  fromAbstract(val) {
    return val ? 'featured' : '';
  }

  toAbstract() {
    return this._value === 'featured';
  } 
  
  get isDirty() {
    // does not participate in 'reset'
    return false; 
  }
}

Object.assign( Featured, {
  propertyName: 'featured',
});

module.exports = Featured;