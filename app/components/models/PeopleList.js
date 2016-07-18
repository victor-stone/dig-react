import React         from 'react';
import LinkToPeople  from '../services/LinkToPeopleRoute';

function List(props)
{
  return <ul className="people-list">{props.model.map( (u,i) => <li key={i}><LinkToPeople {...props} model={u} /></li>)}</ul>;
}

module.exports = List;