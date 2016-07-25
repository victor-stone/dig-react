import React        from 'react';
import Slider       from '../../vanilla/slider';
import PropertyState from '../mixins/property-state';

class SliderFilter extends PropertyState(React.Component)
{
  constructor() {
    super(...arguments);
  }
  
  render() {
    return <Slider {...this.props} value={this.state.value} onSlide={this.updateValue} />;
  }

}

module.exports = SliderFilter;

