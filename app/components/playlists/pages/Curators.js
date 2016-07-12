import React         from 'react';
import PeopleList    from '../../models/PeopleList';
import curatorsCSS   from '../style/curators';
import InlineCSS     from '../../vanilla/InlineCSS';

function Curators(props) {
  return (        
    <div className="container-fluid curators-page">
      <InlineCSS css={curatorsCSS} id="curators-css" />
      <PeopleList model={props.store.model} avatar floating suburl="playlists" />
    </div>
  );
}

module.exports = Curators;