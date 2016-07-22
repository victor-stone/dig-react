
import Property from '../property';

class BPMProperty extends Property {
 constructor() {
    super(...arguments);
    this._propName    = 'bpm';
    this._displayName = 'bpm';
  }
}

BPMProperty.propertyName = 'bpm-value';

module.exports = BPMProperty;

