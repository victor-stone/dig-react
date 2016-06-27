'use strict';

import React            from 'react';
import { FeaturedPage } from '../../components/dig';
import { mergeParams }  from '../../unicorns';
import qc               from '../../models/query-configs';
import Remixes         from '../../stores/remixes';

var ccplus = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="usd" title={ccplus.title} />
    );      
  },

});

ccplus.title = 'Music Available for Royalty-Free License';

ccplus.subnav = FeaturedPage.subnav;

ccplus.store = function(params,queryParams) {
  var opts = mergeParams( {}, qc.remixes, { lic: 'ccplus', reqtags: '-ccplus_stem' } );
  var qparams = mergeParams( {}, opts, queryParams  );
  return Remixes.storeFromQuery(qparams,opts);
};

module.exports = ccplus;

