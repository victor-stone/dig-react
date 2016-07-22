
import Property from '../property';

class NameProperty extends Property {
 constructor() {
    super(...arguments);
    this._propName    = 'name';
    this._displayName = 'name';
  }
}

NameProperty.propertyName = 'name';

module.exports = NameProperty;

