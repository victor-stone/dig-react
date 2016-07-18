import React    from 'react';
import DeadLink from './vanilla/DeadLink';

import { cleanSearchString,
         selectors,
         bindAll } from '../unicorns';

const DEFAULT_INPUT_SIZE = 30;

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
class SearchBox extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onChange', 'onKeyDown', 'onIcon' );
    const { value = '', defaultValue = '' } = this.props;
    this.state = { value: value || defaultValue };
  }

  componentWillReceiveProps(nextProps) {
    if( 'value' in nextProps ) {
      this.setState({ value: nextProps.value });
    }
  }
  
  onChange(event) {
    this.setState({value: event.target.value},function() {
      if( this.props.anyKey ) {
        this.submitSearch();
      }
    });
  }

  onKeyDown(e) {
    if( e.keyCode === RETURN_KEY ) {
      this.submitSearch();
    }
  }

  submitSearch(isIcon) {
    var text = cleanSearchString(this.state.value);
    this.props.submitSearch( text, isIcon || false, (value) => {
      this.setState({ value });
    });
  }

  onIcon() {
    this.submitSearch(true);
  }

  render() {

    const { placeholder = 'genre, instrument, etc.', 
            icon = 'search',
            className = '',
            size = DEFAULT_INPUT_SIZE,
            id = 'searchText'
          } = this.props;

    const { value } = this.state;

    const inputProps = {
      id,
      size,
      value,
      placeholder,
      ref:       'input',
      type:      'text',
      className: selectors('form-control',className),
      onChange:  this.onChange,
      onKeyDown: this.onKeyDown,
    };

    return (
      <div className="form-group input-group input-group-sm">
        <input {...inputProps} />
        <span className="input-group-addon">  
          <DeadLink onClick={this.onIcon} icon={icon} />
        </span>
      </div>      
    );
  }
}


module.exports = SearchBox;
