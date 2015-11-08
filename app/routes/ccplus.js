'use strict';

import React            from 'react';
import { FeaturedPage } from '../components';
import { mergeParams }  from '../unicorns';
import qc               from '../models/query-configs';
import Playlist         from '../stores/playlist';

var ccplus = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="usd" title={ccplus.title} />
    );      
  },

});

ccplus.title = 'Music Available for Royalty-Free License';

ccplus.store = function(params,queryParams) {
  var qparams = mergeParams( {}, qc.default, { lic: 'ccplus' }, queryParams  );
  return Playlist.storeFromQuery(qparams);
};

module.exports = ccplus;

