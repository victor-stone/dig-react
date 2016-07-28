import React             from 'react';

import { bindAll }       from '../../../unicorns';

import PropertyState     from '../mixins/property-state';

import { Input,
         FormField as Field,
         InputExpando }  from '../../vanilla';

import { FormControl }   from '../../vanilla/form';

import ToggleEditModeProperty from './toggle-edit-mode';



const InputPropertyMixin = baseclass => class extends baseclass {

  constructor() {
    super(...arguments);

    const superCurry = meth => {
      let mySuperCall = super[meth];
      return mySuperCall 
                ? (a,b,c,d,e) => mySuperCall.apply(this,[a,b,c,d,e]) 
                : () => false;
    };

    this.superShouldComponentUpdateIPM = superCurry('shouldComponentUpdate');

  }
  
  shouldComponentUpdate(nextProps,nextState) {
    return this.isSwitchEditMode(nextState) || 
             this.state.scratch !== nextState.scratch || 
             this.superShouldComponentUpdateIPM(nextProps,nextState);
  }

  onChange(event) {
    
    const { target:{value} } = event;

    this.setState({ scratch: value });

    if( this.props.allKeys ) {
      this.updateValue(value);
    }
  }

  onDone() {
    this.updateValue(this.state.scratch);
  }

  onCancel() {
    this.resetValue();
  }

  stateFromProperty(property) {
    const state = super.stateFromProperty(property);
    state.scratch = state.editable;
    return state;
  }

  get control() {
    const { placeholder } = this.props;

    return {
      Element: props => <span onChange={this.onChange.bind(this)}><Input {...props} /></span>,
      props:  {
        value: this.state.scratch,
        onDone: this.onDone,
        propOwned: true,
        placeholder
      }
    };
  }  
};

class InputProperty extends InputPropertyMixin(PropertyState(React.Component))
{
  constructor() {
    super(...arguments);

    // these are autobound in ToggleProperty but NOT 
    // anywhere else so we have to do it manually

    bindAll( this, 'onCancel', 'onDone' );
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
    bindAll( this, 'onCancel', 'onDone' );
  }

  isSwitchEditMode() {
    return false;
  }
  
  render() {
    return (<span onChange={this.onChange.bind(this)}>
              <InputExpando 
                {...this.props} 
                propOwned
                value={this.state.scratch} 
                onCancel={this.onCancel} 
                onDone={this.onDone} 
              />
            </span>);
  }
}

class InputToggleModeProperty extends InputPropertyMixin(ToggleEditModeProperty.Field)
{
  get editableElement() {
    return this.control;
  }

  get staticElement() {
    return { 
      Element: FormControl, 
      props: {
        value: this.property.value
      } 
    };
  }
  
}

InputProperty.Toggle  = InputToggleModeProperty;
InputProperty.Expando = InputPropertyExpando;

module.exports = InputProperty;

//