import React         from 'react';
import PeopleHeader             from '../../models/PeopleHeader';
import LinkToUploadNumPlaylists from '../LinkToUploadNumPlaylists';

/*
  Display a list of tracks by this artist that are
  featured in playlists
*/
function People(props)
{
  var store = props.store;
  return (        
    <div className="container-fluid people-tracks-page">      
      <PeopleHeader model={store.model.artist} />
      <div className="row">
        <div className="col-md-7">
          <ul className="people-tracks">
            {store.model.items.map( t => <li key={t.id}><LinkToUploadNumPlaylists model={t} /></li> )}
          </ul>
        </div>
      </div>
    </div>
  );
}

module.exports = People;