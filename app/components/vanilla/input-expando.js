/* globals $ */
import React       from 'react';
import Field       from './form-field';
import { bindAll,
         nextId }  from 'unicorns';
import Input       from './input';
import InlineCss   from './inline-css';

const MAX_WIDTH = 100;
const MIN_WIDTH = 8;

const makeCSS = id => `
#${id} {
  width: ${MIN_WIDTH}px;
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
}

#search-form {
  float: right;
  margin-top: 5px;
  margin-right: 8px;
}

#search-form .input-group-btn {
  display: inline-block;
}
`;

class InputExpando extends React.Component
{
  constructor() {
    super(...arguments);

    bindAll( this, 'onOpen', 'onClose' );
    
    this.state = { 
      open: false, 
    };
    
    ({ id:this.id = nextId('_expando_') } = this.props);
  }

  componentDidUpdate() {
    const UPDATE_DELAY = 200;
    this.state.opening && setTimeout( () => this.performOpen(), UPDATE_DELAY );
  }

  performOpen() {
    this.setState( { opening: false, open: true }, () => $('#'+this.id).animate( {width:MAX_WIDTH} ) );
  }
  
  onOpen() {
    this.setState( {opening:true} );
  }

  onClose() {
    $('#'+this.id).animate({width:MIN_WIDTH}, () => {
      this.setState({open:false});
    });
    this.props.onCancel && this.props.onCancel();
  }

  render() {
    const { open } = this.state;

    const postfix = open
                      ? [ { icon: 'search', onClick:this.props.onDone   },
                          { icon: 'times',  onClick:this.onClose }]
                      : [ { icon: 'search', onClick:this.onOpen } ];
    return (
        <Field id="search-form" postfix={postfix} >
          <InlineCss css={makeCSS(this.id)} id={this.id + '-css'} />
          <Input id={this.id} placeholder="search term" {...this.props} />
        </Field>
      );

  }
}


module.exports = InputExpando;
