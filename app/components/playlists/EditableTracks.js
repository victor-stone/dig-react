import React          from 'react';
import Tracks         from './Tracks';
import { TrackList }  from  './Edit';
import api           from '../../services/ccmixter';

import { EditControls } from '../../mixins';

var EditableTracks = React.createClass({

  mixins: [ EditControls ],

  doneEdit: function() {
    /* globals $ */
    var sortkeys = $('#fo').sortable( 'serialize' );
    var id       = this.props.store.model.head.id;
    api.playlist.reorder(id,sortkeys).then( () => {
      this.props.store.model.tracks.refresh({});
    });
  },

  render: function() {
    var model   = this.props.store.model;
    var store   = model.tracks;
    var isDyn   = model.head.isDynamic;
    var title   = isDyn ? 'edit query' : 'edit order';
    var staticOwned = this.props.store.permissions.isOwner && !isDyn;

    return (
      <div className="tracks-widget">
        {staticOwned
          ? this.editControls( { title } )
          : null
        }
        {this.state.editing 
          ? <TrackList store={store} sortable id="tracks" />
          : <Tracks store={store} editing={staticOwned} />
        }
      </div>
    );
  }
});

module.exports = EditableTracks;

//