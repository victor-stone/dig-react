import React              from 'react';
import Query              from '../../stores/query';
import queryConfig        from '../../models/query-configs';


import PageHeader       from '../../components/PageHeader';
import { Link }         from '../../components/People';
import { ExternalLink } from '../../components/ActionButtons';

function Curators(props) {
  var store = props.store;
  return (
      <ul className="curators-list">
        {store.model.map( c => <li key={c.id}><Link model={c} avatar /></li> )}
      </ul>
    );
}

function curatorsPage(props) {
  var store = props.store;
  return (        
    <div className="container-fluid curators-page">
      <PageHeader icon="hand-o-up" title={curatorsPage.title} />
      <div className="curator-message">{"Interested in being a curator? Head on over to "}<ExternalLink href="http://ccmixter.org" text="ccMixter" />{" to create an account to create your own playlists."}</div>
      <Curators store={store} />
    </div>
  );
}

curatorsPage.title = 'Featured Curators';

curatorsPage.store = function(/*params,queryParams */) {
  var query = new Query();
  return query.findUsers( queryConfig.playlistCurators ).then( curators =>{
    query.model = curators;
    return query;
  });
};

module.exports = curatorsPage;

//