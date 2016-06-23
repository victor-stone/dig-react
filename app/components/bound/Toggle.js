import React            from 'react';
import Toggle           from '../vanilla/Toggle';
import { ModelTracker } from '../../mixins';

/*
  Display a bound toggle switch

  props
    propName := property name (boolean)
    text := display text    
*/
class BoundToggle extends ModelTracker.extender(React.Component)
{
  constructor() {
    super(...arguments);
    this.onToggle = this.onToggle.bind(this);
  }

  stateFromStore(store) {
    var props = {};
    props[this.props.propName] = '';
    props = store.getProperties(props);
    this.setState( { toggle: !!props[this.props.propName]} );
  }

  onToggle(value) {
    var props = {};
    props[this.props.propName] = value;
    this.props.store.setProperties(props);
  }

  render() {
    return <Toggle toggle={this.state.toggle} text={this.props.text} onToggle={this.onToggle} {...this.props} />;
  }
}


module.exports = BoundToggle;