import React from 'react';
import Glyph from '../components/Glyph';

var EditControls = {

  _startEdit: function() {
    this.setState( { editing: true }, () => {
      if( this.startEdit ) {
        this.startEdit();
      }
    });
  },

  _doneEdit: function() {
    if( this.doneEdit ) {
      this.doneEdit();
    }
    this.setState( { editing: false } );
  },

  _cancelEdit: function() {
    this.setState( { editing: false }, () => {
      if( this.cancelEdit ) {
        this.cancelEdit();
      }
    });
  },

  editControls(props) {
      var title     = props.title ? (' ' + props.title) : '';

      return (
        <div className="btn-group btn-group-sm edit-controls">
          <button className="btn btn-default"  disabled={this.state.editing}  onClick={this._startEdit} ><Glyph icon="edit"  />{title}</button>
          {this.state.editing
            ? <button className="btn btn-success"  onClick={this._doneEdit}  ><Glyph icon="check" /></button>
            : null
          }
          {this.state.editing
            ? <button className="btn btn-danger"   onClick={this._cancelEdit}><Glyph icon="times" /></button>
            : null
          }          
        </div>    
      );
  }
};


module.exports = EditControls;

//