import React from 'react';
import Glyph from '../components/Glyph';
import Controls from '../components/EditControls';

var EditControls = {

  getInitialState() {
    return { editing: false };
  },
  
  shouldComponentUpdate(nextProps,nextState) {
    return this.state.editing !== nextState.editing || this.state.text !== nextState.text;
  },
  
  _startEdit() {
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

  _doneEdit() {
    if( this.doneEdit ) {
      this.doneEdit();
    }
    this.setState( { editing: false } );
  },

  _cancelEdit() {
    this.setState( { editing: false }, () => {
      if( this.cancelEdit ) {
        this.cancelEdit();
      }
    });
  },

  editControls(props) {
      if( props.bare ) {
          if( this.state.editing ) {
            return (
                <span className="input-group-btn">
                  <Controls.Done onClick={this._doneEdit} />
                  <Controls.Cancel onClick={this._cancelEdit} />
                </span>
              );
          }
        return (
            <span className="input-group-addon"><Controls.Edit onClick={this._startEdit} /></span>
          );
      }
      return (
        <div className="btn-group btn-group-sm edit-controls">
          <button className="btn btn-default"  disabled={this.state.editing}  onClick={this._startEdit} ><Glyph icon="edit"  /></button>
          {this.state.editing &&  <Controls.Done onClick={this._doneEdit} />}
          {this.state.editing && <Controls.Cancel onClick={this._cancelEdit} />}
        </div>    
      );
  }
};


module.exports = EditControls;

//