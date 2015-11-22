import React            from 'react';
import { FeaturedPage } from '../components';
import { mergeParams }  from '../unicorns';
import qc               from '../models/query-configs';
import Playlist         from '../stores/playlist';

var games = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="gamepad" title={games.title} />
    );      
  },

});

games.title = 'Music for Video Games';

games.store = function(params,queryParams) {
  var qparams = mergeParams( {}, qc.default, qc.recent, qc.instrumental, qc.games, queryParams );
  return Playlist.storeFromQuery(qparams);
};


module.exports = games;

