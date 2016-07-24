import { FormControl }   from '../../vanilla/Form';

import ToggleEditModeProperty from './ToggleEditMode';

import InputPropertyMixin from './InputMixin';

class InputToggleModeProperty extends InputPropertyMixin(ToggleEditModeProperty.Field)
{
  constructor() {
    super(...arguments);
  }

  get editableElement() {
    return this.control;
  }

  get staticElement() {
    return { Element: FormControl, props: {value: this.state.value} };
  }
  
}

module.exports = InputToggleModeProperty;

