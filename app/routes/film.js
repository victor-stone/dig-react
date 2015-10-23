'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns/goodies';
import qc               from '../models/queryConfigs';
import Playlist         from '../stores/playlist';

var film = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="film" title="Instrumental Music for Film and Video" />
    );      
  },

});

film.model = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, qc.instrumental, qc.film, queryParams||{} );
  var playlist = new Playlist();
  return playlist.playlist(qparams);
};

module.exports = film;

