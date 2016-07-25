import React from 'react';
import Glyph from './Glyph';

class DeleteButton extends React.Component
{
  constructor() {
    super(...arguments);
    this._onClick = this._onClick.bind(this);
  }

  _onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDelete();
  }

  render() {
    return <button className="btn btn-danger" onClick={this._onClick}><Glyph icon="trash" /></button>;
  }
}


module.exports = DeleteButton;