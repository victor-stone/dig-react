import React from 'react';

var DeadLink = React.createClass({

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onClick && this.props.onClick();
  },

  render() {
    return (<a className="deadlink" {...this.props} href="#" onClick={this.onClick} >{this.props.children}</a>);
  }
});


module.exports = DeadLink;
