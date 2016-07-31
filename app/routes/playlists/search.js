// TODO this page is broken
/*
import React              from 'react';
import Playlists          from '../../stores/playlists';
import { PlaylistWidget } from '../../components/playlists/browse';
import { mergeParams }    from 'unicorns';

import PageHeader             from '../../components/page-header';
import Glyph                  from '../../components/glyph';
import Link                   from '../../components/link';
import { QueryParamTracker,
         ModelTracker }       from '../../mixins';

var CuratorSearchResults = React.createClass({

  mixins: [ ModelTracker ],

  stateFromStore(store) {
    return { curators: store.model.curators || [] };
  },

  render: function() {
    var curators = this.state.curators;
    if( !curators.length ) {
      return null;
    }
    return (
        <div className="curator-search-results">
          <span className="curator-label">{"curators: "}</span>
          {curators.map( c => (<Link key={c.id} href={'/people/' + c.id}><Glyph icon="user" />{" "}{c.name}</Link>))}
        </div>
      );
  }
});

var search = React.createClass({
    
  mixins: [ QueryParamTracker ],

  stateFromParams(queryParams) {
    return { text: queryParams.search };
  },

  render: function() {
    var store = this.props.store;
    var text  = this.state.text;

    return (        
      <div className="container-fluid playlist-search-page">
        <PageHeader icon="search" subTitle="search" title={text} />
        <CuratorSearchResults store={store} />
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
  var qparams = mergeParams( { minitems: '0', dynamic: 1 }, queryParams );
  return Playlists.storeFromQuery( qparams );
};

module.exports = search;
*/
//