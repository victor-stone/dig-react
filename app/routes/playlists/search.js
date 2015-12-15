import React              from 'react';
import Playlists          from '../../stores/playlists';
import { PlaylistWidget } from '../../components/playlists/Browse';
import { mergeParams }    from '../../unicorns';

import PageHeader             from '../../components/PageHeader';
import { QueryParamTracker }  from '../../mixins';

var search = React.createClass({
    
  mixins: [ QueryParamTracker ],

  stateFromParams: function(queryParams) {
    return { text: queryParams.search };
  },

  render: function() {
    var store = this.props.store;
    var text  = this.state.text;

    return (        
      <div className="container-fluid playlist-search-page">
        <PageHeader icon="search" subTitle="search" title={text} />
        <PlaylistWidget store={store} />
      </div>
    );
  }

});


search.title = 'Search';

search.store = function(params,queryParams) {
  if( !queryParams.search ) {
    queryParams.search = '';
  }
  var qparams = mergeParams( { minitems: '-1' }, queryParams );
  return Playlists.storeFromQuery( qparams );
};

module.exports = search;

//