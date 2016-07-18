import React                  from 'react';
import { bindAll }            from '../../../unicorns';
import Toggle                 from '../../vanilla/Toggle';

class ToggleFilter extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onToggle', 'onValueChange');
    const { store, filter:Filter } = this.props;
    this.filter = store.addProperty(Filter);
    this.filter.onChange( this.onValueChange );
    this.state = { toggle: this.filter.value };
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.toggle !== nextState.toggle;
  }

  onValueChange(filter) {
    this.setState( {toggle:filter.value} );
  }

  onToggle() {
    this.filter.value = !this.state.toggle;
  }

  render() {
    const { state:{toggle}, filter:{displayName}, props:{className} } = this;

    return (
        <Toggle className={className} toggle={toggle} text={displayName} onToggle={this.onToggle} />
      );
  }
}

 
module.exports = ToggleFilter;

