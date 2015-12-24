/*eslint "react/no-danger":0 */
/* globals $ */
import React from 'react';

var Alert = React.createClass({

  getInitialState: function() {
    return { type:  this.props.type,
             cls:  'alert alert-' + this.props.type + ' ' + this.props.className,
             text:  this.props.text };
  },

  componentWillReceiveProps: function(props) {
    this.setState( {
      type: props.type,
      cls:  'alert alert-' + props.type + ' ' + props.className,
      text: props.text
    });
  },

  componentWillUpdate: function() {
    $(this.state.cls).hide();
  },

  componentDidUpdate: function() {
    $(this.state.cls).toggle( !!this.state.text );
  },

  render: function() {
    if( !this.state.text ) {
      return null;
    }
    var times  = { __html: '&times;' };
    var text   = this.state.text;
    var title  = 'Success';
    if( this.state.type === 'warning' ) {
      title = 'Warning';
    } else if( this.state.type === 'danger' ) {
      title = 'Danger';
    }
    return (
      <div className={this.state.cls}>
        <a href="#" className="close" data-dismiss="alert" dangerouslySetInnerHTML={times}></a>
        <strong>{title}</strong>{text}
      </div>      
    );
  }
});

module.exports = Alert;