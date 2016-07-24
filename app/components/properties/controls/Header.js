import React        from 'react';
import InputToggle  from './InputToggle';
import { Glyph }    from '../../vanilla';

class StaticHeader extends React.Component
{
  render() {
    const { icon, value } = this.props;

    return (
      <div className="page-header"> 
        <h1 className="center-text">
          <Glyph icon={icon} />{' ' + value}
        </h1>
      </div>
      );
  }
}

class HeaderProperty extends InputToggle
{
  get staticElement() {
    const { icon } = this.props;
    const { value } = this.state;
    return {
      Element: StaticHeader, 
      props: { icon, value }
    };
  }

  get title() {
    return null;
  }
}

module.exports = HeaderProperty;

//