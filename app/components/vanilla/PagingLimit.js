import React            from 'react';

// TODO: don't assume 10, 20, 40, etc.

class PagingLimit extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = { limit: this.props.limit };
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState( {limit: nextProps.limit} );
  }

  onSelect() {
    this.props.onLimitChange(this.refs['limit'].value);
  }

  render() {
    var cls = 'limit-label ' + (this.props.className || '');
    var opts = [];
    //var limit = this.state.limit + '';
    [ '10', '20', '40' ].forEach( value => {
      opts.push( (<option key={value} value={value}>{value}</option>) );
    });

    return (
        <label className={cls}>{"display "}
          <select ref="limit" id="limit" value={this.state.limit} onChange={this.onSelect} >
            {opts}
          </select>
        </label>
      );    
  }

}


module.exports = PagingLimit;


