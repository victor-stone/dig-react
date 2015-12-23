import React  from 'react';

import { EditControls } from '../mixins';

/*eslint "react/no-danger":0 */
/* globals $ */

var EditDiv = React.createClass({

  mixins: [EditControls],

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
    var text = $('#' + this.props.id).html(); // .replace(/[\n\r]/g,' ');
    this.setState( { text }, () => {
      if( this.props.onChange ) {
        this.props.onChange( this.state.text );
      }
    });
  },

  startEdit: function() {
    $('#' + this.props.id).focus();
  },

  doneEdit: function() {
    if( this.props.doneEdit ) {
      this.props.doneEdit( this.state.text );
    }
  },

  cancelEdit: function() {
    this.setState( { text: this.state.orgText } );
  },

  render: function() {
    var html     = { __html: this.state.text };
    var title    = this.props.title;
    var controls = this.state.enabled ? this.editControls( {title} ) : null;

    return (
      <span>
        <span id={this.props.id}
              onInput={this.onChange}
              contentEditable={this.state.editing} 
              dangerouslySetInnerHTML={html} 
        />
        {controls}
      </span>               
    );
  }
});


module.exports = EditDiv;

//