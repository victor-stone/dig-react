import React   from 'react';

import CollapsingList from '../vanilla/collapsing-list';
import LinkToPeople   from '../services/link-to-people-route';

class CollapsingPeopleList extends CollapsingList
{
  listElement(model,key) {
    return (<li key={key}><LinkToPeople thumb model={model} /></li>);
  }
}

module.exports = CollapsingPeopleList;

