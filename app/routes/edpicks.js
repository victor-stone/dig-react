'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns/goodies';
import { query }        from '../stores/query';
import qc               from '../models/queryConfigs';


const edpicks = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="thumbs-o-up" title="Editors' Picks" />
    );      
  },
});

edpicks.model = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, { reqtags: 'editorial_pick' }, qc.recent, queryParams||{} );
  return query.playlistWithCount(qparams);
}

module.exports = edpicks;

