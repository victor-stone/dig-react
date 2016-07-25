import React from 'react';
import Glyph from './glyph';

import { selectors } from '../../unicorns';

class Toggle extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = { toggle: this.props.toggle};
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState( {toggle: nextProps.toggle} );
  }

  onChange() {
    this.props.onToggle(!this.state.toggle);
  }

  render() {
    const { toggle, className } = this.props;
    const icon = toggle ? 'toggle-on' : 'toggle-off';
    const cls = selectors('toggle', className);

    return <a {...this.props} onClick={this.onChange} className={cls}>{this.props.text + ' '}<Glyph icon={icon}/></a>;
  }
}

module.exports = Toggle;