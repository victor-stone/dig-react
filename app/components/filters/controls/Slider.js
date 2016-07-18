import React        from 'react';
import { bindAll }  from '../../../unicorns';
import Slider       from '../../vanilla/Slider';

class SliderFilter extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onSlide', 'onValueChange' );
    const { store, filter:Filter } = this.props;
    this.filter = store.addProperty(Filter);
    this.state = { value: this.filter.value };
    this.filter.onChange( this.onValueChange );
  }
  
  onValueChange( filter ) {
    this.setState( { value: filter.value } );
  }

  onSlide(val) {
    this.filter.value = val;
  }

  render() {
    return <Slider {...this.props} value={this.state.value} onSlide={this.onSlide} />;
  }

}

module.exports = SliderFilter;

