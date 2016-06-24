import React from 'react';
import EditControls from './EditControls';

import { bindAll } from '../../unicorns';

var nextID = 0;

class FormattedTextEditor extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll(this, 'onChange' );
    let text;
    ({ text, focusId:this.focusId = 'element_' + ++nextID } = this.props);
    this.state = { text, orgText: text };
  }

  onChange(e) {
    this.setState({text:e.target.value});
  }

  htmlTextarea() {
    return(
      <div onChange={this.onChange} >
        <textarea
            id={this.focusId}
            className="form-control"
            value={this.state.text} 
            placeholder="awesome!"
            rows="6" 
            {...this.props}
        ></textarea>
      </div>
      );
  }

  render() {
    return this.htmlTextarea();
  }

}

/*
  Emit inline html with unformatted text that is optionally editable by user and 
  bound to a store's property 

  props
    text := unformatted (editable) text
    html := formatted html to display static while not editing
    canEdit := boolean if user is allowed to edit
    className := for outter div wrapper
*/
class InlineFormattedTextEditor extends FormattedTextEditor
{
  /*eslint "react/no-danger":0 */
  constructor() {
    super(...arguments);
    bindAll(this, 'onCancel', 'onEdit', 'onDone' );
    const { text } = this.props;
    this.state = { text, orgText: text };

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
    this.props.onDone(this.state.text);
  }

 render() {
    const { className, html = this.state.text, canEdit } = this.props;
    const { editing } = this.state;
    return (
        <div cls={className}>           
          {editing
            ? this.htmlTextarea()
            : <span dangerouslySetInnerHTML={{ __html: html }}></span>
          }
          {canEdit && <EditControls.ButtonGroup onEdit={this.onEdit} onCancel={this.onCancel} onDone={this.onDone} />}
        </div>
      );
  }
}

module.exports = {
  FormattedTextEditor,
  InlineFormattedTextEditor
};

//