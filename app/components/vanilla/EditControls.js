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
      return <a href="#" className="edit-button" onClick={this.__onClick}><Glyph icon="edit" /></a>;
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

class GroupBase extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = { editing: false };
    ['_startEdit','_doneEdit', '_cancelEdit'].forEach( f => this[f] = this[f].bind(this));
  }

  shouldComponentUpdate(nextProps) {
    return this.props.editing !== nextProps.editing;
  }

  _startEdit() {
    this.setState( { editing: true }, () => {
      this.startEdit && this.startEdit();
      this.onEditState && this.onEditState(true);
    });
  }

  _doneEdit() {
    this.setState( { editing: false }, () => {
      this.doneEdit && this.doneEdit();
      this.onEditState && this.onEditState(false);
    });
  }

  _cancelEdit() {
    this.setState( { editing: false }, () => {
      this.cancelEdit && this.cancelEdit();
      this.onEditState && this.onEditState(false);
    });
  }

}

// use to be 'bare'
class InputGroup extends React.Component 
{
  render() {
    return this.state.editing
            ? <span className="input-group-btn">
                  <Done onDone={this._doneEdit} />
                  <Cancel onCancel={this._cancelEdit} />
                </span>
            : <span className="input-group-addon"><Edit onEdit={this.props.onEdit} /></span>;
    }
}

class ButtonGroup extends GroupBase 
{
  render() {
      <div className="btn-group btn-group-sm edit-controls">
        <button className="btn btn-default"  disabled={this.state.editing}  onEdit={this._startEdit} ><Glyph icon="edit"  /></button>
        {this.state.editing &&  <Done onDone={this._doneEdit} />}
        {this.state.editing && <Cancel onCancel={this._cancelEdit} />}
      </div>;
  }
}

module.exports = {
  Edit,
  Cancel,
  Done,
  InputGroup,
  ButtonGroup
};