import React            from 'react';
import { FeaturedPage } from '../components';
import { mergeParams }  from '../unicorns';
import qc               from '../models/query-configs';
import Playlist         from '../stores/playlist';

var free = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="beer" title={free.title} />
    );      
  },

});

free.title = 'Free for Commercial Use';

free.store = function(params,queryParams) {
  var qparams = mergeParams( {}, qc.default, { lic: 'open' }, queryParams );    
  return Playlist.storeFromQuery(qparams);
};

module.exports = free;

