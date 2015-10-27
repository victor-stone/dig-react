'use strict';

import React            from 'react';
import { oassign }      from '../unicorns';
import { ExternalLink } from '../components/ActionButtons';
import qc               from '../models/queryConfigs';

import { Playlist, Paging } from '../components';

import PlaylistStore         from '../stores/playlist';
import { service as query } from '../stores/query';

const PeopleHeader = React.createClass({

  render: function() {
    var model = this.props.model;

    var homelink = model.homepage 
            ? <ExternalLink className="btn btn-info" href={model.homepage} text="homepage" />
            : null;

    return (
        <div className="page-header">
          <h1 className="center-text"><img className="img-circle" src={model.avatarURL} /> {model.name}</h1>
          <div className="center-text">
            <ExternalLink className="btn btn-info" href={model.url} text="@ccMixter" /> {homelink}
          </div>
        </div>
      );
    },

});

const people = React.createClass({

  render() {
    var store  = this.props.store;

    return  (
      <div>
        <PeopleHeader model={store.artist} />
        <Paging store={store} />
        <Playlist store={store} skipUser />
      </div>
    );
  },

});

people.path = '/people/:userid';

people.title = 'People';

people.store = function(params,queryParams) {
  
    people.title = 'People';

    var qparams = oassign( {}, qc.default, { u: params.userid }, queryParams );

    var retStore = null;

    function getArtistDetail( store ) {
      retStore = store;
      return query.findUser(params.userid);
    }
    
    function returnArtistDetail( model ) {
      people.title = model.name;
      retStore.artist = model;
      return retStore;
    }
    
    return PlaylistStore.queryAndReturnStore(qparams)
          .then( getArtistDetail )
          .then( returnArtistDetail );
};

module.exports = people;

