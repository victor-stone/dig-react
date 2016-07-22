import React       from 'react';
import Filter      from '../../models/filters/lookup';
import Input       from '../properties/controls/Input';

function LookupInput(props)
{
  return <Input withCancel allKeys {...props} property={Filter} />;
}

module.exports = LookupInput;
