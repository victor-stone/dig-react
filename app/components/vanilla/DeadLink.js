import React from 'react';
import Glyph from './Glyph';

var DeadLink = React.createClass({

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onClick && this.props.onClick();
  },

  render() {
    let { icon, text, children } = this.props;
    icon && (text = ' ' + text);
    return (<a className="deadlink" {...this.props} href="#" onClick={this.onClick} >{icon && <Glyph icon={icon} />}{text}{children}</a>);
  }
});


module.exports = DeadLink;
