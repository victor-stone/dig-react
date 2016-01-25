import React      from 'react';
import People     from '../People';
import SharePopup from '../SharePopup';
import Glyph      from '../../components/Glyph';
import Link       from '../../components/Link';

import EditableDescription from './EditableDescription';
import EditableTags        from './EditableTags';
import DeletePlaylist      from './DeletePlaylist';
import lookup              from '../../services';

import { PlaylistOwner,
         CurrentUserTracker }   from '../../mixins';
import CCMixter                 from '../../stores/ccmixter';

var EditQueryLink = React.createClass({

  mixins: [PlaylistOwner],

  render: function() {
    if( !this.state.isOwner ) {
      return null;
    }

    var head = this.props.store.model.head;
    var isDyn = head.isDynamic;
    var href  = '/playlist/browse/' + head.id + '/edit';

    return isDyn
          ? <Link className="btn btn-success" href={href}><Glyph icon="edit" />{" edit query"}</Link>
          : null;
  }
});

var FeatureLink = React.createClass({
  
  mixins: [CurrentUserTracker],

  toggleFeatured: function() {
    var id = this.props.store.model.head.id;
    CCMixter.toggleFeaturedPlaylist( id ).then( () => lookup('router').navigateTo('/playlist/browse/' + id) );
  },

  render: function() {
    if( !this.state.user || !this.state.user.isAdmin ) {
      return null;
    }
    var head = this.props.store.model.head;
    var text = head.isFeatured ? ' un-feature' : ' feature';
    return <button className="btn btn-success" onClick={this.toggleFeatured}><Glyph icon="star" />{text}</button>;
  }

});

function ShareLink(model) {
  return 'http://playlists.ccmixter.org/playlist/browse/' + model.id;
}

function Curator(props) {

  var model = props.store.model.head;

  return(
      <div className="playlist-curator playlist-bg-color">
        <People.Link model={model.curator} avatar suburl="playlists" />
      </div>
    );  
}

function ActionButtonBar(props) {
  var store = props.store;
  var model = props.store.model.head;

  return(
      <div className="action-btn-toolbar playlist-bg-color">
        <SharePopup     model={model} modelLink={ShareLink} med />
        <FeatureLink    store={store} />
        <EditQueryLink  store={store} />
        <DeletePlaylist store={store} />
      </div>
    );
}

var Info = React.createClass({

  render: function() {
    var store = this.props.store;

    return (
        <div className="playlist-info hidden-xs hidden-sm">
          <EditableDescription store={store} />
          <ActionButtonBar store={store} />
          <Curator store={store} />
          <EditableTags store={store} />
        </div>
      );
  }
});

module.exports = Info;

//