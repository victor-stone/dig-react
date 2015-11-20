import React            from 'react';
import { mergeParams }  from '../unicorns';
import qc               from '../models/query-configs';
import PlaylistStore    from '../stores/playlist';

import {  Playlist, 
          People,
          Paging   }  from '../components';


var people = React.createClass({

  render() {
    var store  = this.props.store;

    return  (
      <div>
        <People.Header model={store.model.artist} />
        <Paging store={store} />
        <Playlist store={store} skipUser />
        <Playlist.NotALotHere store={store} />
      </div>
    );
  },

});

people.path = '/people/:userid';

people.title = 'People';

people.store = function(params,queryParams) {
  var qparams = mergeParams( {}, qc.default, { u: params.userid }, queryParams );
  return PlaylistStore.storeFromQuery(qparams)
          .then( store => {
            people.title = store.model.artist.name;
            return store;
          });
};

module.exports = people;

