import React            from 'react';
import Playlists        from '../../stores/playlists';
import { mergeParams }  from '../../unicorns';
import { Browse }       from '../../components/playlists/Browse';

var browse = React.createClass({

  render() {
    var store = this.props.store;
    return (
      <div className="container-fluid">
        <Browse store={store} />
      </div>
    );      
  },

});

browse.title = 'Browse Playlists';

browse.store = function(params,queryParams) {
  var qparams = mergeParams( { }, queryParams );
  return Playlists.storeFromQuery(qparams);
};

module.exports = browse;

