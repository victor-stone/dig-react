
import Property from '../property';

class OrderProperty extends Property {
 constructor() {
    super(...arguments);
    this._propName    = 'order';
    this._displayName = 'order';
  }
}

OrderProperty.propertyName = 'order';

module.exports = OrderProperty;

