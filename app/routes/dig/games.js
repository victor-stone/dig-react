import React            from 'react';
import { FeaturedPage } from '../../components/dig';
import { mergeParams }  from 'unicorns';
import qc               from '../../models/query-configs';
import Remixes         from '../../stores/remixes';

var games = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="gamepad" title={games.title} />
    );      
  },

});

games.title = 'Music for Video Games';

games.subnav = FeaturedPage.subnav;

games.store = function(params,queryParams) {
  var opts    = mergeParams( {}, qc.remixes, qc.instrumental );
  var qparams = mergeParams( {}, opts, qc.recent, qc.games, queryParams );
  return Remixes.storeFromQuery(qparams,opts);
};


module.exports = games;

