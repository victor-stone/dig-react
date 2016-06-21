import React from 'react';
import Glyph from './Glyph';


class Toggle extends React.Component
{
  constructor() {
    super(...arguments);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onToggle(!this.props.toggle);
  }

  render() {
    var icon = this.props.toggle ? 'toggle-on' : 'toggle-off';
    return <button onClick={this.onClick} {...this.props}><Glyph icon={icon} x2 />{' ' + this.props.text}</button>;
  }
}

module.exports = Toggle;