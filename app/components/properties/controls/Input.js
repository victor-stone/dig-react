import React             from 'react';

import InputPropertyMixin from './InputMixin';
import PropertyState     from '../mixins/PropertyState';

import { Field }         from '../../vanilla/Form';

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

module.exports = InputProperty;

//