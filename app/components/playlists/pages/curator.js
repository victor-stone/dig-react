import React         from 'react';
import Browse        from '../Browse';
import PeopleHeader  from '../../models/PeopleHeader';

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