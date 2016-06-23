import React from 'react';

function Ribbon(props) {
  var color = props.color || 'orange';
  var cls = `ribbon ${color} ${this.props.className}`;
  return <span className={cls}>{this.props.text}</span>;
}

module.exports = Ribbon;