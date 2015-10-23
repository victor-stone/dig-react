'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns/goodies';
import qc               from '../models/queryConfigs';
import Playlist         from '../stores/playlist';

const free = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="beer" title="Free for Commercial Use" />
    );      
  },

});

free.model = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, { lic: 'open' }, queryParams||{} );
  var playlist = new Playlist();
  return playlist.playlist(qparams);
};

module.exports = free;

