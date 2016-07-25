import React         from 'react';
import Browse        from '../browse';
import PeopleHeader  from '../../models/people-header';

function Curator(props) {
  var store = props.store;
  return (        
    <div className="container-fluid curator-detail-page">
      <PeopleHeader model={store.model.curator} />
      <Browse store={store} skipUser />
    </div>
  );
}

module.exports = Curator;