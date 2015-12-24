/*eslint "react/no-danger":0 */
/* globals $ */
import React from 'react';

var Alert = React.createClass({

  getInitialState: function() {
    return { type:  this.props.type,
              id:   this.props.id || 'sys-alert',
             cls:  'alert fade alert-' + this.props.type + ' ' + this.props.className,
             text:  this.props.text };
  },

  componentDidMount: function() {
    var $e = $('#' + this.state.id);
    $e.show();
    $e.on('closed.bs.alert', this.props.onClose);
  },

  render: function() {
    var times  = { __html: '&times;' };
    var text   = this.state.text;
    var title  = 'Success';
    if( this.state.type === 'warning' ) {
      title = 'Warning';
    } else if( this.state.type === 'danger' ) {
      title = 'Danger';
    }
    return (
      <div className={this.state.cls} id={this.state.id} >
        <a href="#" className="close" data-dismiss="alert" dangerouslySetInnerHTML={times}></a>
        <strong>{title}</strong>{text}
      </div>      
    );
  }
});

module.exports = Alert;

//