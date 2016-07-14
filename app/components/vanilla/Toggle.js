import React from 'react';
// import Glyph from './Glyph';

// import { selectors } from '../../unicorns';

const toggle = (
  <label className="tgl">
    <input type="checkbox" checked/>
    <span className="tgl_body">
      <span className="tgl_switch"></span>
        <span className="tgl_track">
          <span className="tgl_bgd"></span>
          <span className="tgl_bgd tgl_bgd-negative"></span>
        </span>
      </span>
    </label>
  );
class Toggle extends React.Component
{
  constructor() {
    super(...arguments);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onToggle(!this.props.toggle);
  }

  render() {
    /*
    const { toggle, className } = this.props;
    const icon = toggle ? 'toggle-on' : 'toggle-off';
    const cls = selectors('toggle', className);

    return <button onClick={this.onClick} {...this.props} className={cls}><Glyph icon={icon} x2 />{' ' + this.props.text}</button>;
    */
    return toggle;
  }
}

module.exports = Toggle;