import React         from 'react';
import LinkToPeople  from '../services/LinkToPeopleRoute';

function List(props)
{
  return <ul className="people-list">{props.model.map( (u,i) => <li><LinkToPeople {...props} key={i} model={u} /></li>)}</ul>;
}

module.exports = List;