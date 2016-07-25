import React             from 'react';

import PropertyState     from '../mixins/PropertyState';

import Field             from '../../vanilla/FormField';

import Input             from '../../vanilla/Input';
import { FormControl }   from '../../vanilla/Form';

import ToggleEditModeProperty from './ToggleEditMode';



const InputPropertyMixin = baseclass => class extends baseclass {

  constructor() {
    super(...arguments);

    /*
      Checking 'super' seem to be insanely costly in 
      Babel. We curry the results here so we can
      just do a straight call.
    */
    this.superShouldComponentUpdateIPM = (() => {
            let mySuperCall = super.shouldComponentUpdate;
            return mySuperCall 
                      ? (p,s) => mySuperCall.apply(this,[p,s])
                      : () => false;
          })();

  }
  
  shouldComponentUpdate(nextProps,nextState) {
    return this.isSwitchEditMode(nextState) || this.superShouldComponentUpdateIPM(nextProps,nextState);
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
      Element: props => <span onChange={this.onChange.bind(this)}><Input {...props} /></span>,
      props:  {
        value: this.property.editable,
        onDone: this.onDone,
        onChange: this.onChange,
        placeholder
      }
    };
  }  
};

class InputProperty extends InputPropertyMixin(PropertyState(React.Component))
{
  constructor() {
    super(...arguments);
    this.onCancel = this.onCancel.bind(this);
    this.onDone  = this.onDone.bind(this);
  }

  onCancel() {
    if( this.props.allKeys ) {
      this.updateValue('');
    }
  }

  render() {

    const { title, 
            className, 
            withCancel, 
            withDone, 
            icon='check' } = this.props;

    const postfix = [];

    withDone   && postfix.push({ icon,         onClick: this.onDone } );
    withCancel && postfix.push({ icon:'times', onClick: this.onCancel });

    const Control = this.control;

    return(
        <Field title={title} className={className} postfix={postfix}>
          <Control.Element {...Control.props} />
        </Field>
      );
  }
}

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

InputProperty.Toggle = InputToggleModeProperty;

module.exports = InputProperty;

//