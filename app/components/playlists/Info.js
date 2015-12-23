import React      from 'react';
import People     from '../People';
import SharePopup from '../SharePopup';
import Glyph      from '../../components/Glyph';
import Link       from '../../components/Link';
import Modal      from '../../components/Modal';

import EditableDescription from './EditableDescription';
import EditableTags        from './EditableTags';

import CCMixter            from '../../stores/ccmixter';
import { PlaylistOwner }   from '../../mixins';
import env                 from '../../services';

var DeleteLink = React.createClass({

  mixins: [PlaylistOwner],

  getInitialState: function() {
    return { view: false };
  },
  
  handleHideModal: function() {
    this.setState({ view: false });
  },

  handleShowModal: function(e){
    e.stopPropagation();
    e.preventDefault();
    this.setState( { view: true, msg: null, error: null } );
  },

  doDelete: function() {
    var id = this.props.store.model.head.id;
    CCMixter.deletePlaylist(id)
      .then( () => {
        env.message = (<div className="alert alert-success fade in">
                      <strong>{"Success!"}</strong>{this.state.msg}
                      </div>);
        /* global $ */
        $('.modal').modal('hide');
        window.history.back();
      }).catch( (e) => this.setState( { msg: 'wups - ' + e.message, error: e } ) );
  },

  genPopup: function() {
    var title = this.props.store.model.head.name;
    var body = null;
    var action = null;

    if( this.state.error ) {
      body = (<div className="alert alert-danger fade in">
                <strong>{"wups!"}</strong>{this.state.msg}
              </div>);
    }  else {
      body = <div>{"are you sure you want to delete this playlist? (there's no undo)"}</div>;
      action = this.doDelete;
    }

    return ( <Modal handleHideModal={this.handleHideModal} icon="trash" subTitle="confirm delete" title={title} action={action} buttonText="Delete">
              {body}
            </Modal> );
  },

  render: function() {
    if( !this.state.isOwner ) {
      return null;
    }

    return this.state.view 
            ? this.genPopup()
            : (<button className="btn btn-danger" onClick={this.handleShowModal}><Glyph icon="trash" />{" delete"}</button>);
  }
});

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

var Info = React.createClass({

  render: function() {
    var store = this.props.store;
    var model = this.props.store.model.head;

    return (
        <div className="playlist-info hidden-xs hidden-sm">
          <div className="playlist-curator">
            <span>{"curator: "}</span>
            <People.Link model={model.curator} avatar />
          </div>
          <div className="action-btn-toolbar">
            <SharePopup    model={model} modelLink={ShareLink} med />
            <EditQueryLink store={store} />
            <DeleteLink    store={store} />
          </div>
          <EditableTags store={store} />
          <EditableDescription store={store} />
        </div>
      );
  }
});

module.exports = Info;

//