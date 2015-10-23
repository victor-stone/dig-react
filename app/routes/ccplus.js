'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns/goodies';
import qc               from '../models/queryConfigs';
import Playlist         from '../stores/playlist';

var ccplus = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="usd" title="Music Available for Royalty-Free License" />
    );      
  },

});

ccplus.model = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, { lic: 'ccplus' }, queryParams||{} );
  var playlist = new Playlist();
  return playlist.playlist(qparams);
};

module.exports = ccplus;

