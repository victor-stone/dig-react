'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns/goodies';
import qc               from '../models/queryConfigs';

import { service as query } from '../stores/query';

var games = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="gamepad" title="Music for Video Games" />
    );      
  },

});

games.model = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, qc.instrumental, qc.games, queryParams||{} );
  return query.playlistWithCount(qparams);
};


module.exports = games;

