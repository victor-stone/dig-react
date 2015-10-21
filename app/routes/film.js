'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns/goodies';
import { query }        from '../stores/query';
import qc               from '../models/queryConfigs';

var film = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="film" title="Instrumental Music for Film and Video" />
    );      
  },

});

film.model = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, qc.instrumental, qc.film, queryParams||{} );
  return query.playlistWithCount(qparams);
}

module.exports = film;

