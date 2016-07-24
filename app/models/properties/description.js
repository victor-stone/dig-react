
import Text from './text';

class DescriptionProperty extends Text {
 constructor() {
    super('description');
    this._displayName = 'about';
  }
}

DescriptionProperty.propertyName = 'description';

module.exports = DescriptionProperty;

