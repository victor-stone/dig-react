import QueryFilter  from '../query-filter';

class Limit extends QueryFilter
{
  constructor() {
    super(...arguments);
    
    this._propName    = 'limit';
    this._displayName = 'Limit';

    this._setsDefaultFromNative = true;
  }
  
  get isDirty() {
    // does not participate in 'reset'
    return false; 
  }
}

Limit.propertyName = 'limit';

module.exports = Limit;