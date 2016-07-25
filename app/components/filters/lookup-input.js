import React          from 'react';
import Filter         from '../../models/filters/lookup';
import InputProperty  from '../properties/controls/Input';

function LookupInput(props)
{
  return <InputProperty withCancel allKeys {...props} property={Filter} />;
}

module.exports = LookupInput;
