import QueryFilter      from '../query-filter';
import PropertyStateful from '../property-stateful';

class Limit extends PropertyStateful(QueryFilter)
{
  constructor() {
    super(...arguments);
    this._propName    = 'limit',
    this._displayName = 'limit';
    this._setsDefaultFromNative = true;
  }

  deserialize(val) {
    super.deserialize( Number(val) );
  }
}

Object.assign(Limit,{
  propertyName: 'limit',
});

Limit.MIN_LIMIT    = 10;

module.exports = Limit;