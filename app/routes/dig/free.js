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
  var opts    = mergeParams( { lic: 'open' }, qc.remixes );
  var qparams = mergeParams( {}, opts, queryParams );    
  return Playlist.storeFromQuery(qparams,opts);
};

module.exports = free;

