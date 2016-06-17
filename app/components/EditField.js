import React           from 'react';
import Glyph           from './Glyph';

var EditField = React.createClass({

  getInitialState: function() {
    return { value: (this.props.value || '').toString() };
  },

  handleChange(event) {
    this.setState({value: event.target.value} );
  },

  render: function() {

    return (
      <div className="input-group input-group-sm">
        <input type="text" onChange={this.handleChange} value={this.state.value} className="form-control input-sm"  placeholder={this.props.placeholder} />
        <span className="input-group-btn">
          <button type="button" onClick={this.props.onSave}  className="btn btn-default"><Glyph icon="check" /></button>
          <button type="button" onClick={this.props.onClear} className="btn btn-default"><Glyph icon="times" /></button>
        </span>
      </div>
      );
  }
});

module.exports = EditField;

//