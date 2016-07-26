import React       from 'react';
import Filter      from '../../models/filters/search';
import Input       from '../properties/controls/input';

function SearchFilter(props)
{
  return <Input.Expando icon="search" withDone {...props} property={Filter} />;
}

module.exports = SearchFilter;
