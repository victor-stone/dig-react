'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns';
import qc               from '../models/queryConfigs';
import Playlist         from '../stores/playlist';

var edpicks = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="thumbs-o-up" title={edpicks.title} />
    );      
  },
});

edpicks.title = 'Editors Picks';

edpicks.store = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, { tags: 'editorial_pick' }, qc.recent, queryParams );
  return Playlist.storeFromQuery(qparams);
};

module.exports = edpicks;

