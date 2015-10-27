import React            from 'react';
import { FeaturedPage } from '../components';
import { oassign }      from '../unicorns';
import qc               from '../models/queryConfigs';
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
  var qparams = oassign( {}, qc.default, qc.instrumental, qc.games, queryParams );
  return Playlist.queryAndReturnStore(qparams);
};


module.exports = games;

