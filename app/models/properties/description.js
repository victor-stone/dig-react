
import Property from '../property';

class DescriptionProperty extends Property {
 constructor() {
    super(...arguments);
    this._propName    = 'description';
    this._displayName = 'about';
  }
}

DescriptionProperty.propertyName = 'description';

module.exports = DescriptionProperty;

