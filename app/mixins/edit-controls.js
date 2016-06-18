import React from 'react';
import Glyph from '../components/Glyph';

var EditControls = {

  getInitialState() {
    return { editing: false };
  },
  
  _startEdit(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState( { editing: true }, () => {
      if( this.props.focusId ) {
        /* globals $ */
        $('#'+this.props.focusId).focus();
      }
      if( this.startEdit ) {
        this.startEdit();
      }
    });
  },

  _doneEdit(e) {
    e.stopPropagation();
    e.preventDefault();
    if( this.doneEdit ) {
      this.doneEdit();
    }
    this.setState( { editing: false } );
  },

  _cancelEdit(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState( { editing: false }, () => {
      if( this.cancelEdit ) {
        this.cancelEdit();
      }
    });
  },

  editControls(props) {
      var title     = props.title ? (' ' + props.title) : '';

      if( props.bare ) {
          if( this.state.editing ) {
            return (
                <span className="input-group-btn">
                  <button className="btn btn-success"  onClick={this._doneEdit}  ><Glyph icon="check" /></button>
                  <button className="btn btn-danger"   onClick={this._cancelEdit}><Glyph icon="times" /></button>
                </span>
              );
          }
        return (
            <span className="input-group-addon"><a onClick={this._startEdit} ><Glyph icon="edit"  />{title}</a></span>
          );
      }
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