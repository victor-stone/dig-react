import QueryFilter  from '../query-filter';

class Offset extends QueryFilter
{
  constructor() {
    super(...arguments);
    
    this._propName    = 'offset';
    this._displayName = 'Offset';

    this._setsDefaultFromNative = true;
  }
  
  get isDirty() {
    // does not participate in 'reset'
    return false; 
  }
}

Offset.propertyName = 'offset';


module.exports = Offset;