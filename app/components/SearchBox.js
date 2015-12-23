import React  from 'react';
import Glyph  from './Glyph';

import { cleanSearchString } from '../unicorns';

const RETURN_KEY = 13;

/**
  properties: 
    submitSearch - [function] called on change. Prototype:
                   
                   submitSearch( text, isIcon [, filterCallback ] ) 

                        text           - [string] user's latest text
                        isIcon         - [boolean] user clicked on icon (true|false)
                        filterCallback - [function] use this to filter text. 
                                           prototype:
                                            
                                            filterCallback(newText)
                                              
                                              nextText - [string] new value for input

    icon - [string] replacement icon (default 'search')

    placeholder - [string] replacement placeholder text (default: genre, instrument, etc. )

    anyKey - [boolean] call submitSearch on every keystroke (default: only on return key)

*/
const SearchBox = React.createClass({

 getInitialState: function() {
    return {
      value: this.props.defaultValue || ''
    };
  },

  handleChange: function(event) {
    this.setState({value: event.target.value},function() {
      if( this.props.anyKey ) {
        this.submitSearch();
      }
    });
  },

  onKey: function(e) {
    if( e.keyCode === RETURN_KEY ) {
      this.submitSearch();
    }
  },

  submitSearch: function(isIcon) {
    var text = cleanSearchString(this.state.value);
    this.props.submitSearch( text, isIcon || false, (newText) => {
      this.setState({value: newText});
    });
  },

  onIcon: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.submitSearch(true);
  },

  render: function() {

    var pholder = this.props.placeholder || 'genre, instrument, etc.';
    var icon    = this.props.icon || 'search';
    var onIcon  = this.onIcon;

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
          <a href="#" onClick={onIcon} ><Glyph icon={icon} /></a>
        </span>
      </div>      
    );
},

});


module.exports = SearchBox;
