import React            from 'react';
import { FeaturedPage } from '../components';
import { mergeParams }  from '../unicorns';
import qc               from '../models/query-configs';
import Playlist         from '../stores/playlist';

var film = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="film" title={film.title} />
    );      
  },

});

film.title = 'Instrumental Music for Film and Video';

film.store = function(params,queryParams) {
  var qparams = mergeParams( {}, qc.default, qc.instrumental, qc.film, queryParams );
  return Playlist.storeFromQuery(qparams);
};

module.exports = film;

