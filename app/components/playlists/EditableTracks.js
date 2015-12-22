import React          from 'react';
import Glyph          from '../Glyph';
import Link           from '../Link';
import Tracks         from './Tracks';
import { TrackList }  from  './Edit';

import { PlaylistOwner } from '../../mixins';

var EditableTracks = React.createClass({

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

module.exports = EditableTracks;

//