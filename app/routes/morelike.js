'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns/goodies';
import qc               from '../models/queryConfigs';

import { service as query } from '../stores/query';

const morelike = React.createClass({

  render() {
    var title = this.props.tags.replace(/[^a-z_]+/,' ');
    return (
      <FeaturedPage {...this.props} icon="exchange" subTitle="More like" title={title} />
    );      
  },
});

morelike.path = '/morelike/:id';

morelike.model = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, { tags: params.id }, queryParams||{} );
  return query.playlistWithCount(qparams);
}

module.exports = morelike;

