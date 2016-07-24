import React       from 'react';
import Select      from '../../vanilla/Select';
import PropertyState from '../mixins/PropertyState';

class SelectFilter extends PropertyState(React.Component)
{
  render() {
    const { state:{value}, props:{options,id,className} } = this;

    return <Select value={value} onSelect={this.updateValue} options={options} id={id} className={className} />;
  }
}

module.exports = SelectFilter;