import React       from 'react';
import { Field }   from './Form';
import { bindAll,
         nextID }  from '../../unicorns';
import Input       from './Input';
import InlineCSS   from './InlineCSS';

const makeCSS = id => `
input#${id} {
  display: none;
  width: 2px;
}
`;

class InputExpando extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onOpen', 'onClose', 'onChange');
    this.state = { open: false, value: this.props.value };
    ({ id:this.id = nextID('_expando_') } = this.props);
  }

  onOpen(text,icon) {
    /* globals $ */

    if( icon ) {
      $('#search-form input').toggle().animate({width:220}, () => {
        this.setState({open:true});
      });
    }
  }

  onChange(value) {
    this.setState( {value}, () => {
      const { onChange } = this.props;
      onChange && onChange(...arguments);
    });
  }

  onClose() {
    $('#search-form input').animate({width:2}, () => {
      $('#search-form input').toggle();
      this.setState({open:true});
    });
  }

  onDone() {
    this.props.onDone(this.state.value);
  }

  render() {
    const { open } = this.state;

    const postfix = open
                      ? [ { icon: 'search', onClick:this.onDone   },
                          { icon: 'times',  onClick:this.onClose }]
                      : [ { icon: 'search', onClick:this.onOpen } ];
    return (
        <Field postfix={postfix} {...this.props} >
          <InlineCSS css={makeCSS(this.id)} id={this.id + '-css'} />
          <Input {...this.props} onChange={this.onChange} />
        </Field>
      );

  }
}


module.exports = InputExpando;
