'use strict';

import React            from 'react';
import { FeaturedPage } from '../../components/dig';
import { mergeParams }  from '../../unicorns';
import qc               from '../../models/query-configs';
import Remixes         from '../../stores/remixes';

var edpicks = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="thumbs-o-up" title={edpicks.title} />
    );      
  },
});

edpicks.title = 'Editors Picks';

edpicks.store = function(params,queryParams) {
  var opts    = mergeParams( { reqtags: 'editorial_pick' }, qc.remixes );
  var qparams = mergeParams( {}, opts, qc.recent, queryParams );
  return Remixes.storeFromQuery(qparams,opts);
};

module.exports = edpicks;

