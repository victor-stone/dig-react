import React    from 'react';

import { Field } from './Form';

import Input     from './Input';

class InputWithIcon extends Input
{
  render() {

    const { icon, title } = this.props;

    return (
      <Field title={title} postfix={{ onClick: this.doDone, icon }}>
        {this.input()}
      </Field>      
    );
  }
}

module.exports = InputWithIcon;
