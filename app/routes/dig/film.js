import React            from 'react';
import { FeaturedPage } from '../../components/dig';
import { mergeParams }  from '../../unicorns';
import qc               from '../../models/query-configs';
import Remixes         from '../../stores/remixes';

var film = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="film" title={film.title} />
    );      
  },

});

film.title = 'Instrumental Music for Film and Video';

film.subnav = FeaturedPage.subnav;

film.store = function(params,queryParams) {
  var opts    = mergeParams( {}, qc.remixes, qc.film, qc.instrumental, qc.recent );
  var qparams = mergeParams( {}, opts, queryParams );
  return Remixes.storeFromQuery(qparams,opts);
};

module.exports = film;

