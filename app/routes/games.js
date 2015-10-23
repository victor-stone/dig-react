'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns/goodies';
import qc               from '../models/queryConfigs';
import Playlist         from '../stores/playlist';

var games = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="gamepad" title="Music for Video Games" />
    );      
  },

});

games.model = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, qc.instrumental, qc.games, queryParams||{} );
  var playlist = new Playlist();
  return playlist.playlist(qparams);
};


module.exports = games;

