import React from 'react';

import Modal                    from '../../components/Modal';
import Glyph                    from '../../components/Glyph';
import QueryOptions             from '../../components/playlists/QueryOptions';
import { ModelTracker }         from '../../mixins';

import CCMixter                 from '../../stores/ccmixter';
import lookup                   from '../../services';

var TrackList = React.createClass({

  mixins: [ ModelTracker ],

  componentDidMount: function() {
    if( this.props.sortable ) {
      $('.dragger').show();
      $('#fo').sortable();
    } else {
      $('.dragger').hide();
    }
  },

  stateFromStore: function(store) {
    return { model: store.model };
  },

  render: function() {
    var model = this.state.model;
    return(
        <ul className="track-list" id="fo">
          {model.items.map( (t,i) =>  <li key={t.id} id={'fo_' + (i+1)}>
                                    <span className="dragger"><Glyph icon="bars" /></span>
                                    <span className="name">
                                      {t.name}
                                    </span>
                                    <span className="by">
                                      {" by "}
                                    </span>
                                    <span className="artist">
                                      {t.artist.name}
                                    </span>
                                  </li> )}
        </ul>
      );
  }
});


var SaveDynamicPopup = React.createClass({

  getInitialState: function() {
    return { showModal: false };
  },
  
  handleHideModal: function() {
    this.setState({ showModal: false, msg: null });
  },

  handleShowModal: function(e){
    e.stopPropagation();
    e.preventDefault();
    this.setState( { showModal: true } );
  },

  onSave: function() {
    var name    = this.refs['playlist-name'].value;
    var qstring = this.props.store.queryStringWithDefaults;
    var msg     = 'wups - there was a problem saving your playlist';
    CCMixter.saveDynamicPlaylist(name,qstring).then( playlist => {
      if( playlist && playlist.id ) {
        /* globals $ */
        $('.modal').modal('hide');
        var router = lookup('router');
        router.navigateTo( '/playlist/browse/' + playlist.id );
      } else {
        this.setState( { msg });
      }
    }).catch( (e) => this.setState( { msg: msg + ' ' + e.message } ) );
  },

  genPopup: function() {
    var action = this.state.msg ? null : this.onSave;
    return (  <Modal handleHideModal={this.handleHideModal} 
                     title={"Save Dynamic Playlist"}
                     action={action}
                     icon="cloud-upload"
                     buttonText="Save"
              >              
                {this.state.msg
                  ?<div className="alert alert-warning">
                      <strong>{"Warning! "}</strong>{this.state.msg}
                    </div>
                  : null
                }
                <label className="control-label playlist-save-label" htmlFor="playlist-name">{"Save as"}</label>                  
                <input ref="playlist-name" name="playlist-name" type="text" placeholder="playlist name..." className="form-control input-md" />
              </Modal> );
  },

  render: function() {

    var popup = this.state.showModal ? this.genPopup() : null;
    return (
        <span className="save-playlist-form">
          <button className="btn btn-info save-button" onClick={this.handleShowModal}>{"Save"}</button>
          {popup}
        </span>
      );
  }
});

var DynamicForm = React.createClass({

  render: function() {
    var store = this.props.store;
    return (
        <div className="row">
          <div className="col-md-6">
            <QueryOptions store={store} />
          </div>
          <div className="col-md-6">
            <h3>{"preview"}</h3>
            <TrackList store={store} />
            <SaveDynamicPopup store={store} />
          </div>
        </div>
      );
  }
});


module.exports = {
  DynamicForm,
  SaveDynamicPopup,
  TrackList
};

