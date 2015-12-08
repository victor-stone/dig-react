import React            from 'react';
import { FeaturedPage } from '../../components/dig';
import { mergeParams }  from '../../unicorns';
import qc               from '../../models/query-configs';
import Playlist         from '../../stores/playlist';

var film = React.createClass({

  render() {
    return (
      <FeaturedPage {...this.props} icon="film" title={film.title} />
    );      
  },

});

film.title = 'Instrumental Music for Film and Video';

film.store = function(params,queryParams) {
  var opts    = mergeParams( {}, qc.remixes, qc.film, qc.instrumental );
  var qparams = mergeParams( {}, opts, queryParams );
  return Playlist.storeFromQuery(qparams,opts);
};

module.exports = film;

