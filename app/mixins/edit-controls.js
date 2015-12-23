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

  editControls: function(props) {
      var title     = props.title ? (' ' + props.title) : '';
      var okCls     = this.state.editing ? 'btn btn-success' : 'btn btn-default';
      var cancelCls = this.state.editing ? 'btn btn-danger'  : 'btn btn-default';
      return (
        <div className="btn-group btn-group-sm edit-controls">
          <button className="btn btn-default" disabled={this.state.editing}  onClick={this._startEdit} ><Glyph icon="edit"  />{title}</button>
          <button className={okCls}     disabled={!this.state.editing} onClick={this._doneEdit}  ><Glyph icon="check" /></button>
          <button className={cancelCls} disabled={!this.state.editing} onClick={this._cancelEdit}><Glyph icon="times" /></button>              
        </div>    
      );
  }
};


module.exports = EditControls;

//