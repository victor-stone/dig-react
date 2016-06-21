import React from 'react';
import EditControls from './EditControls';

class FormattedTextEditor extends React.Component
{
  constructor() {
    super(...arguments);
    [ 'onChange' ].forEach( f => this[f] = this[f].bind(this));
    this.state = { text: this.props.text, orgText: this.props.text };
  }

  onChange(e) {
    this.setState({text:e.target.value});
  }

  htmlTextarea() {
    return(
      <div onChange={this.onChange} >
        <textarea
            id={this.props.focusId}
            className="form-control"
            value={this.state.value} 
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
    [ 'onCancel', 'onEdit', 'onDone' ].forEach( f => this[f] = this[f].bind(this));
    this.state = { text: this.props.text, orgText: this.props.text };

  }
  onEdit() {
    /* globals $ */
    this.setState( { editing: true }, () =>  this.props.focusId && $('#'+this.props.focusId).focus() );
  }

  onCancel() {
    this.setState( { text: this.state.orgText, editing: false } );
  }

  onDone() {
    this.setState( { editing: false });
    this.props.onDone(this.state.text);
  }

 render() {
    return (
        <div cls={this.props.className}>           
          {this.state.editing
            ? this.htmlTextarea()
            : <span dangerouslySetInnerHTML={{ __html: this.props.html }}></span>
          }
          {this.props.canEdit && <EditControls.ButtonGroup onEdit={this.onEdit} onCancel={this.onCancel} onDone={this.onDone} />}
        </div>
      );
  }
}

module.exports = {
  FormattedTextEditor,
  InlineFormattedTextEditor
};

//