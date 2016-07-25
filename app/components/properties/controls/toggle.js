import React       from 'react';
import Toggle      from '../../vanilla/toggle';
import PropertyState from '../mixins/property-state';

class ToggleFilter extends PropertyState(React.Component)
{
  constructor() {
    super(...arguments);
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.property.value = !this.state.value;
  }

  render() {
    const { state:{value}, property:{displayName}, props:{className} } = this;

    return (
        <Toggle className={className} toggle={value} text={displayName} onToggle={this.onToggle} />
      );
  }
}

 
module.exports = ToggleFilter;

