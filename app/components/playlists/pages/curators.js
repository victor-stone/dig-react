import React         from 'react';
import PeopleList    from '../../models/people-list';
import curatorsCSS   from '../style/curators';
import InlineCss     from '../../vanilla/inline-css';

function Curators(props) {
  return (        
    <div className="container-fluid curators-page">
      <InlineCss css={curatorsCSS} id="curators-css" />
      <PeopleList model={props.store.model} avatar floating suburl="playlists" />
    </div>
  );
}

module.exports = Curators;