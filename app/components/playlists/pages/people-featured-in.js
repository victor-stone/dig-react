import React         from 'react';
import PeopleHeader             from '../../models/PeopleHeader';
import LinkToUploadNumPlaylists from '../LinkToUploadNumPlaylists';
import { Row,
         FluidContainer,
         Column }     from '../../vanilla/Grid';

/*
  Display a list of tracks by this artist that are
  featured in playlists
*/
function People(props)
{
  var store = props.store;
  return (        
    <FluidContainer className="people-tracks-page">      
      <PeopleHeader model={store.model.artist} />
      <Row>
        <Column cols="7">
          <ul className="people-tracks">
            {store.model.items.map( t => <li key={t.id}><LinkToUploadNumPlaylists model={t} /></li> )}
          </ul>
        </Column>
      </Row>
    </FluidContainer>
  );
}

module.exports = People;