import React     from 'react';

let nextID = 0;

class CheckBox extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = { checked: this.props.checked };
    this.id = this.props.id || '_check_box_' + ++nextID;
  }

  componentWillReceiveProps(nextProps) {
    this.setState( { checked: nextProps.checked } );
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.checked !== nextState.checked;
  }

  onChange() {
    this.props.onChecked(!this.state.checked);
  }

  render() {
    return (
        <label className="form-control" htmlFor={this.id}>{"only unmixed "}<input onChange={this.onChange} 
                                                                                  checked={this.state.checked} 
                                                                                  id={this.id}
                                                                                  type="checkbox"
                                                                           /></label>
      );
  }
}

module.exports = CheckBox;