import React          from 'react';
import Filter         from '../../models/filters/lookup';
import InputProperty  from '../properties/controls/input';

function LookupInput(props)
{
  return <InputProperty withCancel allKeys {...props} Property={Filter} />;
}

module.exports = LookupInput;
