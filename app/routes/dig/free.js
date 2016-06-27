import React            from 'react';
import { FeaturedPage } from '../../components/dig';
import { mergeParams }  from '../../unicorns';
import qc               from '../../models/query-configs';
import Remixes         from '../../stores/remixes';

var free = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="beer" title={free.title} />
    );      
  },

});

free.title = 'Free for Commercial Use';

free.subnav = FeaturedPage.subnav;

free.store = function(params,queryParams) {
  var opts    = mergeParams( {}, qc.remixes, { lic: 'open', reqtags: '-autoplay' }, qc.magicSort );
  var qparams = mergeParams( {}, opts, queryParams );    
  return Remixes.storeFromQuery(qparams,opts);
};

module.exports = free;

