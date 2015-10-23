'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns/goodies';
import qc               from '../models/queryConfigs';

import { service as query } from '../stores/query';

const tags = React.createClass({

  render() {
    var title = this.props.params.tags.replace(/[^a-z_]+/,' ');
    return (
      <FeaturedPage {...this.props} icon="tags" subTitle="Tags" title={title} />
    );      
  },
});

tags.path = '/tags/:tags';

tags.model = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, { tags: params.tags }, queryParams||{} );
  return query.playlistWithCount(qparams);
};

module.exports = tags;

