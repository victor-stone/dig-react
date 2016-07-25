import React         from 'react';
import PeopleHeader             from '../../models/people-header';
import LinkToUploadNumPlaylists from '../link-to-upload-num-playlists';
import { Row,
         FluidContainer,
         Column }     from '../../vanilla/grid';

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