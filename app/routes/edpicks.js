'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns/goodies';
import qc               from '../models/queryConfigs';
import Playlist         from '../stores/playlist';

const edpicks = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="thumbs-o-up" title="Editors' Picks" />
    );      
  },
});

edpicks.store = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, { reqtags: 'editorial_pick' }, qc.recent, queryParams||{} );
  return Playlist(qparams);
};

module.exports = edpicks;

