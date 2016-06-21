import React              from 'react';
import { PlaylistTracks } from '../../stores/playlist';
import { mergeParams }    from '../../unicorns';
import qc                 from '../../models/query-configs';


import { Header }      from '../../components/People';
import  UploadLink     from '../../components/services/LinkToUploadRoute';
import { Paging }      from '../../components';
import { ModelTracker } from '../../mixins';

var people = React.createClass({

  mixins: [ ModelTracker ],

  stateFromStore(store) {
    return { store };
  },

  render: function() {
    var store = this.state.store;
    return (        
      <div className="container-fluid people-tracks-page">      
        <Header model={store.model.artist} />
        <div className="row">
          <div className="col-md-2 col-md-offset-2">
            <Paging store={store} />
          </div>
          <div className="col-md-7">
            <ul className="people-tracks">
            {store.model.items.map( (t,i) => {
              return <li key={i}><UploadLink model={t} /><span className="badge">{t.numPlaylists}</span></li>;
            })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});


people.path = '/people/:userid';

people.title = 'People';

people.store = function(params,queryParams) {
  var defaults = mergeParams( {}, qc.playlistTracks, { user: params.userid } );
  var q = mergeParams( {}, defaults, queryParams );
  return PlaylistTracks.storeFromQuery(q,defaults).then( store => {
    people.title = store.model.artist.name;
    return store;
  });
};

module.exports = people;

//