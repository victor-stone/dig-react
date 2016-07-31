import React         from 'react';
import { selectors } from 'unicorns';

class Select extends React.Component
{
  constructor() {
    super(...arguments);
    this.onSelect = this.onSelect.bind(this);
    const { options } = this.props;
    this.options = Object.keys(options).map( k => <option key={k} value={k}>{options[k]}</option>);
    this.state = { value: this.props.value };
  }

  componentWillReceiveProps(nextProps) {
    if( this.state.value !== nextProps.value ) {
      this.setState( {value: nextProps.value} );
    }
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.value !== nextState.value;
  }
  
  onSelect(e) {
    this.props.onSelect && this.props.onSelect(e.target.value);
  }

  render() {

    const { className, id = 'vanilla-select' } = this.props;

    const cls = selectors('form-control', className );

    return (
        <select value={this.state.value} onChange={this.onSelect} className={cls} id={id} >
          {this.options}
        </select>
      );
  }
}

module.exports = Select;