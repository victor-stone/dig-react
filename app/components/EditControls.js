import React from 'react';
import Glyph from './Glyph';

class ButtonBase extends React.Component
{
  constructor() {
   super(...arguments);
   this.__onClick = this.__onClick.bind(this);
  }

  __onClick(e) {
    e.stopPropagation();
    e.preventDefault();    
    this._onClick();
  }
}

class Edit extends ButtonBase
{
  constructor() {
    super(...arguments);
    this._onClick = this.props.onEdit;
  }

  render() {
      return <a href="#" onClick={this.__onClick}><Glyph icon="edit" /></a>;
  }
}

class Cancel extends ButtonBase
{
  constructor() {
    super(...arguments);
    this._onClick = this.props.onCancel;
  }

  render() {
    return <a href="#" onClick={this.__onClick} className="btn btn-danger"><Glyph icon="times" /></a>;
  }
}

class Done extends ButtonBase
{
  constructor() {
    super(...arguments);
    this._onClick = this.props.onDone;
  }
  render() {
    return <a href="#" onClick={this.__onClick} className="btn btn-success"><Glyph icon="check" /></a>;
  }
}

module.exports = {
  Edit,
  Cancel,
  Done
};