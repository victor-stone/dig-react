import React    from 'react';

import { Field } from './form';

import Input     from './input';

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
