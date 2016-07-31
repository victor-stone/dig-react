import React         from 'react';
import LinkToPeople  from '../services/link-to-people-route';
import { selectors } from 'unicorns';

class PeopleList extends React.Component
{
  render() {
    const { model, listClass } = this.props;
    const cls = selectors('people-list',listClass);
    return <ul className={cls}>{model.map( (u,i) => <li key={i}><LinkToPeople {...this.props} model={u} /></li>)}</ul>;  
  }
  
}

module.exports = PeopleList;