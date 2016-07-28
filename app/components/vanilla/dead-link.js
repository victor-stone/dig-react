import React from 'react';
import Glyph from './glyph';

var DeadLink = React.createClass({

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onClick && this.props.onClick();
  },

  render() {
    let { icon, text = '', children, x2 } = this.props;
    icon && text && (text = ' ' + text);
    return (<a className="deadlink" {...this.props} href="#" onClick={this.onClick} >{icon && <Glyph x2={x2} icon={icon} />}{text}{children}</a>);
  }
});


module.exports = DeadLink;
