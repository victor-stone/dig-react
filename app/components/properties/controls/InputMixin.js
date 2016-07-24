import Input             from '../../vanilla/Input';

import { bindAll,
         safeSetState }  from '../../../unicorns';

const InputPropertyMixin = baseclass => class extends baseclass {

  constructor() {
    super(...arguments);
    bindAll( this, 'onChange' );
    safeSetState( this, { rawText: this.stateEditValue } );
  }

  onChange(event) {
    
    const { target:{value} } = event;

    this.scratch = value;

    if( this.props.allKeys ) {
      this.updateValue(value);
    }
  }

  onDone() {
    this.updateValue(this.scratch);
  }

  get control() {
    const { placeholder } = this.props;

    return {
      Element: Input,
      props:  {
        value: this.stateEditValue,
        onDone: this.onDone,
        onChange: this.onChange,
        placeholder
      }
    };
  }  
};

module.exports = InputPropertyMixin;

//