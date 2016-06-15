import React from 'react';

var FormattedTextEditor = React.createClass({

  getInitialState() {
    return { value: '' };
  },

  onChange(e) {
    this.setState({value:e.target.value});
  },

  render() {
    return(
      <div onChange={this.onChange} >
        <textarea
            className="form-control"
            value={this.state.value} 
            placeholder="awesome!"
            rows="6" 
            {...this.props}
        ></textarea>
      </div>
      );
  }

});

module.exports = FormattedTextEditor;

//