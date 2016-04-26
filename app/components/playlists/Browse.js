import React              from 'react';
import Tags               from './Tags';
import People             from '../People';
import Link               from '../Link';
import PlayAllButton      from './PlayAllButton';
import { ModelTracker }   from '../../mixins';

import InlineCSS               from '../InlineCSS';
import { browse as browseCSS,
         tags   as tagsCSS }   from './style/browse';


var Playlists = React.createClass({

  mixins: [ModelTracker],

  stateFromStore: function(store) {
    return { model: store.model };
  },

  render: function() {

    var model = this.state.model;
    var showUser = !this.props.skipUser;
    return (
      <ul className="playlists-list">
      {model.items.map( p => {
        return(<li key={p.id}>
          <PlayAllButton playlist={p.id} />
          <Link href={'/playlist/browse/'+p.id} className="playlist-link">{p.name}<span className="badge">{p.count}</span></Link>          
          {showUser
            ? <div className="playlist-curator">{"curator: "}<People.Link model={p.curator} suburl="playlists" /></div>
            : null
          }          
          <Tags model={p.tags} />
        </li>);})
      }
      </ul>
      );
    }
});

var PlaylistWidget = React.createClass({

  render: function() {
    var store = this.props.store;
    return (
      <div className="container playlist-browser">
        <InlineCSS css={browseCSS} id="playlists-browse-css"/>
        <InlineCSS css={tagsCSS}   id="playlists-tags-css"/>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <Playlists store={store} skipUser={this.props.skipUser} />
          </div>
        </div>
      </div>
    );      
  }
});

module.exports = {
  Playlists,
  PlaylistWidget,
  Browse: PlaylistWidget
};

