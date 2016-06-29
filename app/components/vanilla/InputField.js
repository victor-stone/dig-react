import React       from 'react';

import { FormItem } from './Form';
import EditControls from './EditControls';

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
    return { text: props.text, orgText: props.text };
  }

  onEdit() {
    /* globals $ */
    this.setState( { editing: true }, () =>  $('#'+this.focusId).focus() );
  }

  onCancel() {
    this.setState( { text: this.state.orgText, editing: false } );
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
    return(
        <FormItem title={this.props.title} cls={this.props.cls}>
          {this.state.editing
            ? this.htmlInput()
            : <span className="form-control">{this.state.text}</span>
          }
          {this.props.canEdit && <EditControls.InputGroup onEdit={this.onEdit} onCancel={this.onCancel} onDone={this.onDone} />}
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
    if( this.props.canEdit ) {
      return(
          <span>
            {this.state.editing 
              ? this.htmlInput()
              : this.state.text}
            <EditControls.ButtonGroup onEdit={this.onEdit} onCancel={this.onCancel} onDone={this.onDone} />
          </span>
        );
    }
    return <span>{this.state.text}</span>;
  }
}


module.exports = {
  InputFormField,
  InputText
};

//