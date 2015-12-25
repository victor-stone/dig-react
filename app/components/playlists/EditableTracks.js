import React          from 'react';
import Tracks         from './Tracks';
import { TrackList }  from  './Edit';
import CCMixter       from '../../stores/ccmixter';

import { PlaylistOwner,
         EditControls } from '../../mixins';

var EditableTracks = React.createClass({

  mixins: [ PlaylistOwner, EditControls ],

  doneEdit: function() {
    /* globals $ */
    var sortkeys = $('#fo').sortable( 'serialize' );
    var id       = this.props.store.model.head.id;
    CCMixter.reorderPlaylist(id,sortkeys).then( () => {
      this.props.store.model.tracks.applySoftParams({});
    });
  },

  render: function() {
    var model = this.props.store.model;
    var store = model.tracks;
    var isDyn = model.head.isDynamic;
    var title = isDyn ? 'edit query' : 'edit order';

    return (
      <div className="tracks-widget">
        {this.state.isOwner && !isDyn
          ? this.editControls( { title } )
          : null
        }
        {this.state.editing 
          ? <TrackList store={store} sortable id="tracks" />
          : <Tracks store={store} />
        }
      </div>
    );
  }
});

module.exports = EditableTracks;

//