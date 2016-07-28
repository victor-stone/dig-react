import React    from 'react';

import { nextID,
         selectors,
         bindAll } from '../../unicorns';

const RETURN_KEY = 13;

class Input extends React.Component
{
  constructor() {
    super(...arguments);
    
    bindAll( this, 'onChange', 'onKeyDown', 'doDone' );

    const { value = '', id = nextID('_input') } = this.props;

    this.state = { value };
    
    this.id = id;
  }

  onChange(event) {
    this.setState({value: event.target.value});
  }

  doDone() {
    this.props.onDone( this.state.value );
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
    return <input {...this.inputProps} />;
  }
}

Input.DEFAULT_INPUT_SIZE = 30;

Input.propTypes = {
  onDone: React.PropTypes.func.isRequired
};

module.exports = Input;
