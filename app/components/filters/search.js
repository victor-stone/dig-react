import React       from 'react';
import Filter      from '../../models/filters/search';
import Input       from '../properties/controls/Input';

function SearchFilter(props)
{
  return <Input icon="search" withDone {...props} filter={Filter} />;
}

module.exports = SearchFilter;
