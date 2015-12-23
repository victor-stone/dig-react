import React          from 'react';
import Tracks         from './Tracks';
import { TrackList }  from  './Edit';

import { PlaylistOwner,
         EditControls } from '../../mixins';

var EditableTracks = React.createClass({

  mixins: [ PlaylistOwner, EditControls ],

  doneEdit: function() {
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
          ? <TrackList store={store} sortable />
          : <Tracks store={store} />
        }
      </div>
    );
  }
});

module.exports = EditableTracks;

//