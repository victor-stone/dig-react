// depreciated
import React            from 'react';
import { FeaturedPage } from '../../components/dig';
import { mergeParams }  from '../../unicorns';
import qc               from '../../models/query-configs';
import Remixes         from '../../stores/remixes';

var latest = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="child" title={latest.title} />
    );      
  },

});

latest.path = '/new';

latest.title = 'New';

latest.store = function(params,queryParams) {
  var opts    = mergeParams( {}, qc.remixes );
  var qparams = mergeParams( {}, opts, qc.latest, queryParams );
  return Remixes.storeFromQuery( qparams, opts );
};

module.exports = latest;

