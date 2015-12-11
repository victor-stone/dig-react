import React            from 'react';
import { mergeParams }  from '../../unicorns';
import qc               from '../../models/query-configs';
import Playlist         from '../../stores/playlist';

import {  Remixes }     from '../../components/dig'; 
import {  People,
          Paging   }    from '../../components';


var people = React.createClass({

  render() {
    var store  = this.props.store;

    if( store.error ) {
      return (<div className="well"><h1>{"wups, can't find that artist"}</h1></div>);
    }
    
    return  (
      <div>
        <People.Header model={store.model.artist} />
        <Paging store={store} />
        <Remixes store={store} skipUser />
        <Remixes.NotALotHere store={store} />
      </div>
    );
  },

});

people.path = '/people/:userid';

people.title = 'People';

people.store = function(params,queryParams) {
  var opts    = mergeParams( {}, qc.remixes );
  var qparams = mergeParams( {}, opts, { u: params.userid }, queryParams );
  return Playlist.storeFromQuery(qparams,opts)
          .then( store => {
            people.title = !this.error && store.model.artist.name;
            return store;
          });
};

module.exports = people;

