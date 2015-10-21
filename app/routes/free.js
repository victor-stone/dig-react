'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns/goodies';
import { query }        from '../stores/query';
import qc               from '../models/queryConfigs';

const free = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="beer" title="Free for Commercial Use" />
    );      
  },

});

free.model = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, { lic: 'open' }, queryParams||{} );
  return query.playlistWithCount(qparams);
}

module.exports = free;

