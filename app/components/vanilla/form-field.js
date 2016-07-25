import React         from 'react';
import { selectors } from '../../unicorns';

import { InputGroupAddon,
         FieldAdornment } from './button-groups';

class InputGroup extends React.Component
{
  get bsSelector() {
    const { sz = 'sm' } = this.props;

    return selectors( 'input-group', sz ? 'input-group-' + sz : '' );
  }

  render() {
    const { className, children } = this.props;
    const cls = selectors( this.bsSelector, className );
    return <div {...this.props} className={cls}>{children}</div>;
  }

}

class Field extends React.Component
{
  get control() {
    return null;
  }

  render() {
    let { sz, prefix, postfix, className, children, title } = this.props;

    title && (prefix = [ {text:title} ]);

    return (
      <InputGroup sz={sz} className={className} >
        {prefix && <InputGroupAddon addons={prefix} />}
        {this.control}{children}
        {postfix && <InputGroupAddon addons={postfix} />}
      </InputGroup>
      );
  }
}


Field.propTypes = {

  prefix: FieldAdornment,
  postfix: FieldAdornment,

  // if you send a 'title' then 'prefix' is ignored
  title: React.PropTypes.string, 

  sz: React.PropTypes.oneOf(['sm', 'md', 'lg']),
                                       
};


module.exports = Field;

//