import React from 'react';
import Glyph from './glyph';

class SaveButton extends React.Component
{
  constructor() {
    super(...arguments);
    this._onClick = this._onClick.bind(this);
  }

  _onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onSave();
  }

  render() {
    return  <button className="btn btn-success save-button" onClick={this._onClick}><Glyph icon="cloud-upload" />{" Save"}</button>;
  }
}

module.exports = SaveButton;