'use strict';

import React            from 'react';
import { oassign }      from '../unicorns/goodies';
import { ExternalLink } from '../components/ActionButtons';
import qc               from '../models/queryConfigs';

import { Playlist, Paging } from '../components';
import { service as query } from '../stores/query';

const PeopleHeader = React.createClass({

  render: function() {
    var model = this.props.model;

    var homelink = model.artist.homepage 
            ? <ExternalLink className="btn btn-info" href={model.artist.homepage} text="homepage" />
            : null;

    return (
        <div className="page-header">
          <h1 className="center-text"><img className="img-circle" src={model.artist.avatarURL} /> {model.artist.name}</h1>
          <div className="center-text">
            <ExternalLink className="btn btn-info" href={model.artist.url} text="@ccMixter" /> {homelink}
          </div>
        </div>
      );
    },

});

const people = React.createClass({

  render() {
    var model  = this.props.model;
    var offset = this.props.queryParams.offset || 0;
    var limit  = this.props.queryParams.limit  || 10;

    return  (
      <div>
        <PeopleHeader model={model} />
        <Paging offset={offset}
                length={this.props.model.playlist.length}
                limit ={limit}
                total ={this.props.model.total} />
        <Playlist model={this.props.model} skipUser />
      </div>
    );
  },

});

people.path = '/people/:userid';

people.model = function(params,queryParams) {
  
    var qparams = oassign( {}, qc.default, { u: params.userid }, queryParams||{} );

    var retModel = { };

    function getArtistDetail( model ) {
      retModel = model;
      return query.findUser(params.userid);
    }
    
    function returnArtistDetail( model ) {
      retModel.artist = model;
      return retModel;
    }
    
    return query.playlistWithCount(qparams)
          .then( getArtistDetail )
          .then( returnArtistDetail );
}

module.exports = people;

