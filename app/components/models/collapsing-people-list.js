import React   from 'react';

import CollapsingList from '../vanilla/CollapsingList';
import LinkToPeople   from '../services/LinkToPeopleRoute';

class CollapsingPeopleList extends CollapsingList
{
  listElement(model,key) {
    return (<li key={key}><LinkToPeople thumb model={model} /></li>);
  }
}

module.exports = CollapsingPeopleList;

