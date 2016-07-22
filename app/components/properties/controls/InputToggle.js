import React             from 'react';
import { FormControl }   from '../../vanilla/Form';
import Input             from '../../vanilla/Input';

import ToggleEditModeProperty from './ToggleEditMode';

class InputToggleModeProperty extends ToggleEditModeProperty
{
  constructor() {
    super(...arguments);
    this.usingInput = false;
  }

  shouldComponentUpdate(nextProps,nextState) {
    if( this.usingInput ) {
      const { editing, value } = this.state;
      return editing !== nextState.editing || (!editing && (value !== nextState.value));
    }
    return super.shouldComponentUpdate(...arguments);
  }

  onEditValue(value) {
    this.setState({ value });
  }

  get editableElement() {
    this.usingInput = true;
    return <Input value={this.state.value} onEdit={this.onEditValue.bind(this)} onDone={this.onChangeValue} />;
  }

  get staticElement() {
    return null;
  }

  get staticFieldElement() {
    return <FormControl value={this.state.value} />;
  }
  
}

module.exports = InputToggleModeProperty;

