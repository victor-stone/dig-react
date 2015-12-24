import React      from 'react';

import Glyph      from '../../components/Glyph';
import Modal      from '../../components/Modal';

import CCMixter            from '../../stores/ccmixter';
import { PlaylistOwner }   from '../../mixins';
import env                 from '../../services/env';

var DeletePlaylist = React.createClass({

  mixins: [PlaylistOwner],

  getInitialState: function() {
    this.manualHide = false;
    return { view: false };
  },
  
  handleHideModal: function() {
    if( !this.manualHide ) {
      this.setState({ view: false });
    }
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
        /* global $ */
        this.manualHide = true;
        $('.modal').modal('hide');
        env.alert('success','playlist has been deleted');
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
    return (<span>
        {this.state.view 
          ? this.genPopup()
          : null
        }
        <button className="btn btn-danger" onClick={this.handleShowModal}><Glyph icon="trash" />{" delete"}</button>
      </span>
      );
  }
});


module.exports = DeletePlaylist;

//