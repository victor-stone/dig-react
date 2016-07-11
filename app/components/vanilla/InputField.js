import React       from 'react';

import { FormItem } from './Form';
import EditControls from './EditControls';

import LoadingGlyph from './LoadingGlyph';

import { bindAll }           from '../../unicorns';

var nextID = 0;

const InputControlMixin = target => class extends target {
  constructor() {
    super(...arguments);
    bindAll(this, 'onCancel', 'onEdit', 'onDone' );
    this.state = this._stateFromProps(this.props);
    this.focusId = this.props.focusId || 'element_' + ++nextID;
  }

  componentWillReceiveProps(nextProps) {
    this.setState( this._stateFromProps(nextProps) );
  }

  _stateFromProps(props) {
    const { text = '' } = props;
    return { text, orgText: text };
  }

  onEdit() {
    /* globals $ */
    this.setState( { editing: true }, () =>  $('#'+this.focusId).focus() );
  }

  onCancel() {
    this.setState( { text: this.state.orgText, editing: false } );
    this.props.onCancel && this.props.onCancel();
  }

  onDone() {
    this.setState( { editing: false });
    this.props.onDone(this.refs.editor.value);
  }

  htmlInput() {
    return <input id={this.focusId} type="text" ref="editor" className="form-control" defaultValue={this.state.text} />;
  }

};

/*
  Emit static text wrapped in bootstrap form-group structure, optionally
  editable by user

  props
    text - text 
    title - form field title
    canEdit - boolean to allow user editing
    onDone(text) callback for receiving text when user has selected 'save' button
*/
class InputFormField extends InputControlMixin(React.Component)
{
  render() {
    const { title, cls, canEdit } = this.props;
    const { editing, text } = this.state;

    return(
        <FormItem title={title} cls={cls}>
          {editing
            ? this.htmlInput()
            : <span className="form-control">{text}</span>
          }
          {canEdit && <EditControls.InputGroup onEdit={this.onEdit} onCancel={this.onCancel} onDone={this.onDone} />}
        </FormItem>
      );
  }
}

/*
  Emit static text optionally editable by user

  props
    text - text 
    canEdit - boolean to allow user editing
    onDone(text) callback for receiving text when user has selected 'save' button
*/
class InputText extends InputControlMixin(React.Component)
{
  constructor() {
    super(...arguments);
  }

  render() {
    const { text, editing } = this.state;

    if( this.props.canEdit ) {
      return(
          <span>
            {editing 
              ? this.htmlInput()
              : text === InputText.LoadingText
                  ? <LoadingGlyph color="inherit" loading />
                  : text}
            <EditControls.ButtonGroup onEdit={this.onEdit} onCancel={this.onCancel} onDone={this.onDone} />
          </span>
        );
    }

    return <span>{text}</span>;
  }
}

InputText.LoadingText = 'thinking...';

/*
  Emit input field for text that optionally automatically clears itself onDone

  props
    text - text 
    onDone(text) callback for receiving text when user has selected 'save' button
*/
class InputBase extends InputControlMixin(React.Component)
{
  constructor() {
    super(...arguments);
  }

  onDone() {
    super.onDone();
    if( this.props.autoclear ) {
      this.refs.editor.value = '';
    }
  }

  onCancel() {
    super.onCancel();
    if( this.props.autoclear ) {
      this.refs.editor.value = '';
    }
  }

  controls(doneIcon) {
    return <EditControls.InputEditGroup onCancel={this.onCancel} onDone={this.onDone} doneIcon={doneIcon} />;
  }
}

class Input extends InputBase
{
  render() {
    return(
      <span>
        {this.htmlInput()}
        {this.controls(this.props.doneIcon)}
      </span>
    );
  }
}

class InputFormItem extends InputBase
{
  render() {
    const { title, cls, sz } = this.props;
    return(
      <FormItem title={title} cls={cls} sz={sz} >
        {this.htmlInput()}
        {this.controls(this.props.doneIcon)}
      </FormItem>
    );
  }
}

module.exports = {
  Input,
  InputText,
  InputFormField,
  InputFormItem
};

//