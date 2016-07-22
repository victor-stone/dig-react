import React        from 'react';
import InputToggle  from './InputToggle';
import { Glyph }    from '../../vanilla';

class HeaderProperty extends InputToggle
{
  get staticElement() {
    const { icon } = this.props;
    const { value } = this.state;

    return (
      <div className="page-header"> 
        <h1 className="center-text">
          <Glyph icon={icon} />{' ' + value}
        </h1>
      </div>
      );
  }
}

module.exports = HeaderProperty;

//