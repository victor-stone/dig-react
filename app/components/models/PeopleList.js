import React         from 'react';
import LinkToPeople  from '../services/LinkToPeopleRoute';

function List(props)
{
  return <div className="people-list">{props.model.map( (u,i) => <LinkToPeople {...props} key={i} model={u} />)}</div>;
}

module.exports = List;