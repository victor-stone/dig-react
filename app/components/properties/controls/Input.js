import React             from 'react';
import PropertyState     from '../mixins/PropertyState';

import Input             from '../../vanilla/Input';
import { Field }         from '../../vanilla/Form';

import { bindAll }       from '../../../unicorns';

class InputProperty extends PropertyState(React.Component)
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onCancel', 'onInputEdit' );
  }

  // input         (DOM)                  -> onChange(event)
  // Input         (vanilla)              -> onEdit(value)
  // InputProperty (properties/controls)  -> onInputEdit(value) *
  //   |->PropertyState                   -> onChangeValue(value)
  // Property                             -> (set) emits value change
  //   |->PropertyState                   -> onValueChanged *

  onInputEdit(value) {
    if( value !== this.state.value ) {
      this.setState({ value }, () => {
        if( this.props.allKeys ) {
          this.onChangeValue(this.state.value);
        }
      });
    } else {
      if( this.props.allKeys && this.property.value !== value ) {
        this.onChangeValue(value);
      }
    }
  }

  onCancel() {
    if( this.props.allKeys ) {
      this.property.value = '';
    }
    this.setState( {value: '' } );
  }

  render() {

    const { title, className, withCancel, withDone, icon='check' } = this.props;

    const postfix = [];

    withDone   && postfix.push({ icon,         btnType:'success', onClick: this.onChangeValue } );
    withCancel && postfix.push({ icon:'times', btnType:'danger',  onClick: this.onCancel });

    return(
        <Field title={title} className={className} postfix={postfix}>
          <Input value={this.state.value} onDone={this.onChangeValue} onEdit={this.onInputEdit} />
        </Field>
      );
  }
}

module.exports = InputProperty;

//