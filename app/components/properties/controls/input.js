import React             from 'react';

import PropertyState     from '../mixins/property-state';

import { Input,
         FormField as Field,
         InputExpando }  from '../../vanilla';

import { FormControl }   from '../../vanilla/form';

import ToggleEditModeProperty from './toggle-edit-mode';



const InputPropertyMixin = baseclass => class extends baseclass {

  constructor() {
    super(...arguments);

    /*
      Checking 'super' seem to be insanely costly in 
      Babel. We curry the results here so we can
      just do a straight call.
    */
    const superCurry = meth => {
      let mySuperCall = super[meth];
      return mySuperCall 
                ? function() { mySuperCall.apply(this,arguments); }
                : () => false;
    };


    this.superShouldComponentUpdateIPM = superCurry('shouldComponentUpdate');

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

  isSwitchEditMode() {
    return false;
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

class InputPropertyExpando extends InputPropertyMixin(PropertyState(React.Component))
{
  constructor() {
    super(...arguments);
//    this.onCancel = this.onCancel.bind(this);
    this.onDone  = this.onDone.bind(this);
  }

  isSwitchEditMode() {
    return false;
  }
  
  render() {
    return (<span onChange={this.onChange.bind(this)}>
              <InputExpando {...this.props} value={this.property.editable} onDone={this.onDone} />
            </span>);
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
InputProperty.Expando = InputPropertyExpando;

module.exports = InputProperty;

//