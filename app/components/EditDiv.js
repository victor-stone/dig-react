import React  from 'react';
import Glyph  from './Glyph';

/*eslint "react/no-danger":0 */
/* globals $ */

var EditDiv = React.createClass({

  getInitialState: function() {
    return { text:    this.props.text,
             orgText: this.props.text,
             enabled: this.props.enabled  };
  },

  componentWillReceiveProps(props) {
    var state = {
      enabled: props.enabled,
      text:    props.text,
    };
    this.setState( state );
  },

  onChange: function() {
    var text = $('#' + this.props.id).html().replace(/[\n\r]/g,' ');
    this.setState( { text }, () => {
      if( this.props.onChange ) {
        this.props.onChange( this.state.text );
      }
    });
  },

  startEdit: function() {
    this.setState( { editing: true }, () => $('#' + this.props.id).focus() );
  },

  doneEdit: function() {
    this.setState( { editing: false }, () => {
      if( this.props.doneEdit ) {
        this.props.doneEdit( this.state.text );
      }
    });
  },

  cancelEdit: function() {
    this.setState( { editing: false, text: this.state.orgText }, () => {
      if( this.props.cancelEdit ) {
        this.props.cancelEdit( this.state.text );
      }
    });
  },

  render: function() {
    var html  = { __html: this.state.text };
    var title = this.props.title ? ' ' + this.props.title : '';

    return (
      <span>
        <span id={this.props.id}
              onInput={this.onChange}
              contentEditable={this.state.editing} 
              dangerouslySetInnerHTML={html} 
        />
        {this.state.enabled
          ? <div className="btn-group btn-group-sm edit-controls">
              <button className="btn btn-default" disabled={this.state.editing}  onClick={this.startEdit} ><Glyph icon="edit"  />{title}</button>
              <button className="btn btn-default" disabled={!this.state.editing} onClick={this.doneEdit}  ><Glyph icon="check" /></button>
              <button className="btn btn-default" disabled={!this.state.editing} onClick={this.cancelEdit}><Glyph icon="times" /></button>              
            </div>
          : null
        }
      </span>               
    );
  }
});


module.exports = EditDiv;

//