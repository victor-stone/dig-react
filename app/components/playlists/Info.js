import React      from 'react';
import People     from '../People';
import SharePopup from '../SharePopup';
import Glyph      from '../../components/Glyph';
import Link       from '../../components/Link';

import EditableDescription from './EditableDescription';
import EditableTags        from './EditableTags';
import DeletePlaylist      from './DeletePlaylist';

import { PlaylistOwner }   from '../../mixins';

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

function ShareLink(model) {
  return 'http://playlists.ccmixter.org/playlist/browse/' + model.id;
}

function Curator(props) {

  var model = props.store.model.head;

  return(
      <div className="playlist-curator playlist-bg-color">
        <People.Link model={model.curator} avatar />
      </div>
    );  
}

function ActionButtonBar(props) {
  var store = props.store;
  var model = props.store.model.head;

  return(
      <div className="action-btn-toolbar playlist-bg-color">
        <SharePopup     model={model} modelLink={ShareLink} med />
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
          <Curator store={store} />
          <ActionButtonBar store={store} />
          <EditableTags store={store} />
          <EditableDescription store={store} />
        </div>
      );
  }
});

module.exports = Info;

//