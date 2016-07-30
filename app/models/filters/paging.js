import { numericize,
         shallowCompare } from '../../unicorns';

import QueryFilter  from '../query-filter';

class Paging  extends QueryFilter
{
  constructor() {
    super(...arguments);
    
    this._propName    = 'offset';
    this._displayName = 'of';
    this._requiresFullRefresh = false;
  }
  
  get value() {
    return this._value;
  }

  set value(val) {
    const numerics = numericize(val);
    if( !shallowCompare( this._value, val ) ) {
      this._value = numerics;
      this.onChange();
    }
  }

  get editable() {
    return super.value;
  }

  set editable(offset) {
    const val = Object.assign({},this._value,{offset});
    this.value = val;
  }

  serialize() {
    return this._value.offset;
  }

  deserialize(value) {
    if( typeof value === 'number' ) {
      value = Object.assign({}, this._value || {}, {offset:value} );
    }
    super.deserialize(value);
  }
  get isDirty() {
    // does not participate in 'reset'
    return false; 
  }
}

Paging.propertyName = 'offset';

module.exports = Paging;