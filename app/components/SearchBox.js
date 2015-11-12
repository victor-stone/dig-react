import React     from 'react';
import Glyph from './Glyph';

const RETURN_KEY = 13;

const SearchBox = React.createClass({

 getInitialState: function() {
    return {
      value: ''
    };
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  onKey: function(e) {
    if( e.keyCode === RETURN_KEY ) {
      this.submitSearch();
    }
  },

  submitSearch: function() {
    var text = this.state.value;
    this.props.submitSearch(text);
  },

  render: function() {

    var pholder = this.props.placeholder || 'genre, instrument, etc.';
    
    return (
      <div className="form-group input-group input-group-sm">
          <input
            type="text"
            className="form-control"
            value={this.state.value}
            placeholder={pholder}
            onChange={this.handleChange}
            onKeyDown={this.onKey}
            ref="input"
            size="30"
            id="searchText"
          />
        <span className="input-group-addon">              
          <a href="#" onClick={this.submitSearch} ><Glyph icon="search" /></a>
        </span>
      </div>      
    );
},

});


module.exports = SearchBox;
