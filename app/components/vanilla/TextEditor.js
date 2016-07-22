import React from 'react';

import { bindAll,
         nextID }    from '../../unicorns';

class TextEditor extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll(this, 'onChange' );
    ({ focusId:this.focusId = nextID('element_') } = this.props);
    this.state = this._editorStateFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState( this._editorStateFromProps(nextProps) );
  }

  _editorStateFromProps(props) {
    const { text } = props;
    return { text, orgText: text };
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

module.exports = TextEditor;

//