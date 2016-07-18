import React from 'react';
import Glyph from './Glyph';

import InputButtonGroup from './InputButtonGroup';

import { bindAll } from '../../unicorns';

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
    const { icon = 'check' } = this.props;
    return <a href="#" onClick={this.__onClick} className="btn btn-success"><Glyph icon={icon} /></a>;
  }
}

class GroupBase extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = { editing: false };
    bindAll(this, '_startEdit','_doneEdit', '_cancelEdit' );
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.props.editing !== nextProps.editing || this.state.editing !== nextState.editing;
  }

  _startEdit() {
    this.setState( { editing: true }, () => this.__doNotify('onEdit',true) );
  }

  _doneEdit() {
    this.setState( { editing: false }, () => this.__doNotify('onDone',false) );
  }

  _cancelEdit() {
    this.setState( { editing: false }, () => this.__doNotify('onCancel',false) );
  }

  __doNotify(meth,flag) {
    this[meth] && this[meth]();
    this.props[meth] && this.props[meth]();
    this.onEditState && this.onEditState(flag);
    this.props.onEditState && this.props.onEditState(flag);
  }
}

// use to be 'bare'
class InputGroup extends GroupBase
{
  render() {
    const { doneIcon } = this.props;
    return this.state.editing
            ? <InputButtonGroup>
                  <Done onDone={this._doneEdit} icon={doneIcon} />
                  <Cancel onCancel={this._cancelEdit} />
               </InputButtonGroup>
            : <span className="input-group-addon"><Edit onEdit={this._startEdit} /></span>;
    }
}

class ButtonGroup extends GroupBase 
{
  render() {
    const { doneIcon } = this.props;
    const { editing } = this.state;
    return(
      <div className="btn-group btn-group-sm edit-controls">
        {!editing && <Edit onEdit={this._startEdit} />}
        {editing  && <Done onDone={this._doneEdit} icon={doneIcon} />}
        {editing  && <Cancel onCancel={this._cancelEdit} />}
      </div>);
  }
}

class InputEditGroup extends GroupBase
{
  render() {
    const { doneIcon } = this.props;
    return (<InputButtonGroup>
              <Done onDone={this._doneEdit} icon={doneIcon} />
              <Cancel onCancel={this._cancelEdit} />
            </InputButtonGroup>);
    }
}

module.exports = {
  Edit,
  Cancel,
  Done,
  InputGroup,
  ButtonGroup,
  InputEditGroup
};