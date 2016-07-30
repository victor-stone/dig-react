import React from 'react';

import { bindAll,
         nextId }    from '../../unicorns';

class TextEditor extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll(this, 'onChange' );
    ({ focusId:this.focusId = nextId('element_') } = this.props);
    this.state = { value: this.props.initialValue };
  }

  onChange(e) {
    this.setState({value:e.target.value});
  }

  render() {
    const { placeholder = 'awesome!' } = this.props;
    return(
      <textarea
          id={this.focusId}
          className="form-control"
          value={this.state.value} 
          onChange={this.onChange}
          placeholder={placeholder}
          rows="6" 
          {...this.props}
      ></textarea>
      );
  }


}

module.exports = TextEditor;

//