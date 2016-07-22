import React    from 'react';

import { nextID,
         selectors,
         bindAll } from '../../unicorns';

const RETURN_KEY = 13;

const filterCallback = value => {
  if( value !== this.state.value ) {
    this.setState({ value });
  }
};

/**
  properties: 
    onEdit - [function] called on change. example:
                   
                   onEdit( text, filterCallback ) 

                        text           - [string] user's latest text
                        filterCallback - [function] use this to filter text. 
                                           prototype:
                                            
                                            filterCallback(newValue)

    onDone - [function] use hit 'return' key. prototype: onDone(textValue)

    placeholder - [string] replacement placeholder text (default: genre, instrument, etc. )

    id - DOM id

    size - HTML 'size'
*/

class Input extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onChange', 'onKeyDown', 'doDone' );
    const { value = '', defaultValue = '' } = this.props;
    this.state = { value: value || defaultValue };
    this.id = nextID('_input');
  }

  componentWillReceiveProps(nextProps) {
    if( 'value' in nextProps ) {
      this.setState({ value: nextProps.value });
    }
  }
  
  onChange(event) {
    this.setState({value: event.target.value},() => {
      const onEdit = this.onEdit || this.props.onEdit;
      onEdit && onEdit( this.state.value, filterCallback.bind(this) );
    });
  }

  doDone() {
    this.props.onDone( this.state.value, filterCallback.bind(this) );    
  }

  onKeyDown(e) {
    if( e.keyCode === RETURN_KEY ) {
      this.doDone();
    }
  }    

  get inputProps() {
    const { 
            placeholder,
            className   = '',
            size        = Input.DEFAULT_INPUT_SIZE,
            id          = this.id,
            
          } = this.props;

    const { value } = this.state;

    return {

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

  }
  
  input() {
    return <input {...this.inputProps} />;
  }

  render() {
    return this.input();
  }
}

Input.DEFAULT_INPUT_SIZE = 30;

Input.propTypes = {
  onEdit: React.PropTypes.func,
  onDone: React.PropTypes.func.isRequired
};

module.exports = Input;
