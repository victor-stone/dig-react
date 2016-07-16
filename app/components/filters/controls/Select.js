import React       from 'react';
import { bindAll } from '../../../unicorns';
import Select      from '../../vanilla/Select';

class SelectFilter extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onSelect', 'onValueChange' ); 
    this.onSelect = this.onSelect.bind(this);
    const { filter:Filter, store } = this.props;
    this.filter = store.addOrGetFilter(Filter);
    this.filter.onChange( this.onValueChange );
    this.state = { value: this.filter.value };
  }

  onValueChange(filter) {
    this.setState( { value: filter.value } );
  }
  
  onSelect(value) {
    this.filter.value = value;
  }

  render() {
    const { state:{value}, props:{options,id,className} } = this;

    return <Select value={value} onSelect={this.onSelect} options={options} id={id} className={className} />;
  }
}

module.exports = SelectFilter;