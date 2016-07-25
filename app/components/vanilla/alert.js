/*eslint "react/no-danger":0 */
/* globals $ */
import React from 'react';

const ALERT_TIMEOUT = 5000;

var Alert = React.createClass({

  getInitialState: function() {
    return { type:  this.props.type,
              id:   this.props.id || 'sys-alert',
             cls:  'alert fade in alert-' + this.props.type + ' ' + (this.props.className || ''),
             text:  this.props.text };
  },

  componentDidMount: function() {
    var $e = $('#' + this.state.id);
    $e.show();
    $e.on('close.bs.alert', this.props.onClose);
    if( !this.props.noAutoFade ) {
      setTimeout( () => $e.fadeOut('slow',() => $e.alert('close')), ALERT_TIMEOUT);
    }
  },

  componentWillReceiveProps(props) {
    this.setState( { type: props.type, text: props.text } );
  },

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.text !== nextState.text;
  },
  
  componentWillUnmount() {
    var $e = $('#' + this.state.id);
    $e.off('close.bs.alert', this.props.onClose);
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
      <div className={this.state.cls} id={this.state.id} >
        <a href="#" className="close" data-dismiss="alert" dangerouslySetInnerHTML={times}></a>
        <strong>{title}</strong> {text}
      </div>      
    );
  }
});

Alert.show = function(/*type,msg*/) {
  throw new Error( '"Alert.show" was not implemented here - you probably want app/services/Alert');
};


module.exports = Alert;

//