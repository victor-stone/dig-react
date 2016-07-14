import React            from 'react';
import Toggle           from '../vanilla/Toggle';
import { ModelTracker } from '../../mixins';

/*
  Display a bound toggle switch

  props
    propName := property name (boolean)
    text := display text    
*/
class BoundToggle extends ModelTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.onToggle = this.onToggle.bind(this);
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.toggle !== nextState.toggle;
  }

  stateFromStore(store) {
    var props = store.getProperties([this.props.propName]);
    return { toggle: !!props[this.props.propName] };
  }

  onToggle(value) {
    var props = {};
    props[this.props.propName] = value;
    this.props.store.applyProperties(props);
  }

  render() {
    return <Toggle toggle={this.state.toggle} text={this.props.text} onToggle={this.onToggle} {...this.props} />;
  }
}


module.exports = BoundToggle;