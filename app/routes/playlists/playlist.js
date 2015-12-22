import React      from 'react';
import Playlist   from '../../stores/playlist';
import Paging     from '../../components/Paging';
import Glyph      from '../../components/Glyph';
import Link       from '../../components/Link';
import EditDiv    from '../../components/EditDiv';
import Info       from '../../components/playlists/Info';
import Tracks     from '../../components/playlists/Tracks';

import { TrackList }  from  '../../components/playlists/Edit';
import { CurrentUserTracker } from '../../mixins';
import { oassign }            from '../../unicorns';

var PlaylistOwner = oassign( {}, CurrentUserTracker, {

  stateFromUser: function(user) {
    var state = { user, isOwner: user.id === this.props.store.model.head.curator.id };
    return state;
  }

});

var EditableTitle = React.createClass({

  mixins: [ PlaylistOwner ],

  getInitialState: function() {
    var name = this.props.store.model.head.name;
    return { name: name };
  },

  onDone: function(/*name*/) {

  },

  onChange: function(text) {
    this.setState( { name: text } );
  },

  render: function() {

    return (
        <div className="page-header"> 
          <h1 className="center-text">
            <Glyph icon="music" /> 
            {" "}
            <EditDiv id="edit-name" 
                 onDone={this.onDone}
                 onChange={this.onChange}
                 onCancel={this.onChange}
                 enabled={this.state.isOwner}
                 text={this.state.name} 
            />
          </h1>
        </div>
      );
  }
});

var EdtiableTracks = React.createClass({

  mixins: [ PlaylistOwner ],

  getInitialState: function() {
    return { editing: false };
  },

  startEdit: function() {
    this.setState( { editing: true } );
  },

  doneEdit: function() {
    this.setState( { editing: false }, () => {
      if( this.props.doneEdit ) {
        this.props.doneEdit(true);
      }
    });
  },

  cancelEdit: function() {
    this.setState( { editing: false }, () => {
      if( this.props.doneEdit ) {
        this.props.doneEdit(false);
      }
    });    
  },

  render: function() {
    var model = this.props.store.model;
    var store = model.tracks;
    var isDyn = model.head.isDynamic;
    var title = isDyn ? 'edit query' : 'edit order';
    var href  = '/playlist/browse/' + model.head.id + '/edit';

    return (
      <div className="tracks-widget">
        {this.state.isOwner && !isDyn
          ? <div className="btn-group btn-group-sm edit-controls">
              <button className="btn btn-default" disabled={this.state.editing}  onClick={this.startEdit} ><Glyph icon="edit"  />{title}</button>
              <button className="btn btn-default" disabled={!this.state.editing} onClick={this.doneEdit}  ><Glyph icon="check" /></button>
              <button className="btn btn-default" disabled={!this.state.editing} onClick={this.cancelEdit}><Glyph icon="times" /></button>
            </div>
          : null
        }
        {this.state.isOwner && isDyn
          ? <div className="btn-group btn-group-sm edit-controls">
              <Link className="btn btn-default" href={href}><Glyph icon="edit" />{title}</Link>
            </div>
          : null
        }
        {this.state.editing 
          ? <TrackList store={store} sortable />
          : <Tracks store={store} />
        }
      </div>
    );
  }
});

var PlaylistPage = React.createClass({

  render: function() {
    var store = this.props.store;
    var model = store.model;

    return (
        <div className="container-fluid playlist-detail-page">
          <EditableTitle store={store} />
          <div className="row">
            <div className="col-md-3 col-md-offset-1">
              {model.head.isDynamic
                ? <Paging store={model.tracks} disableBumping />
                : null
              }
              <Info store={store} />
            </div>
            <div className="col-md-6">
              <EdtiableTracks store={store} />
            </div>
          </div>
        </div>
      );
  }
});

function playlist(props) {
  return (<PlaylistPage {...props} />);
}

playlist.path = '/playlist/browse/:id';

playlist.title = 'Playlist';

playlist.store = function(params /*,queryParams */) {
  var id = params.id;
  return Playlist.storeFromQuery(id).then( store => {
    playlist.title = store.model.head.name;
    return store;
  });
};

module.exports = playlist;

//