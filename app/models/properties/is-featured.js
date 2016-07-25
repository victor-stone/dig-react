
import Property from '../property';

class IsFeaturedProperty extends Property {
 constructor() {
    super(...arguments);
    this._propName    = 'isFeatured';
    this._displayName = 'Featured';
  }
}

IsFeaturedProperty.propertyName = 'is-featured';

module.exports = IsFeaturedProperty;

