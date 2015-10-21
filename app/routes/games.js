'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns/goodies';
import { query }        from '../stores/query';
import qc               from '../models/queryConfigs';

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
}


module.exports = games;

