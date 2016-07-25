import React from 'react';

// http://stackoverflow.com/questions/19425165/bootstrap-3-accordion-button-toggle-data-parent-not-working

/*
    Because of a bug/feature in bootstrap the 'sometarget' has to be an immediate child of "panel"
    and, in turn, "panel" has to be an immediate child of 'someparent'. 
    
    <ul id="someparent">
      <li class="panel">
          <a data-target="#sometarget" data-toggle="collapse" data-parent="#someparent">click me</a>
          <div id="sometarget" class="collapse">
          </div>
      </li>
    </ul>

  */


function CollapseToggle(props) {
  const { group, target, className, text } = props;
  return <a href={'#'+target} className={className} data-toggle="collapse" data-parent={'#'+group}>{text}</a>;
}

class CollapseTarget extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = { show: false };
    this._stateCallback = this._stateCallback.bind(this);
  }

  componentDidMount() {
    /* global $ */
    $('#'+this.props.target)
      .on('show.bs.collapse', () => this._stateCallback(true) )
      .on('hide.bs.collapse', () => this._stateCallback(false) );
  }

  componentWillUnmount() {
    $('#'+this.props.target)
      .off('show.bs.collapse', () => this._stateCallback(true) )
      .off('hide.bs.collapse', () => this._stateCallback(false) );    
  }

  _stateCallback(show) {
    this.setState({show});
  }

  render() {
    return (<div id={this.props.target} className="collapse">
              {this.state.show && this.props.children}
            </div>);
  }
}


module.exports = {
  Toggle: CollapseToggle,
  Target: CollapseTarget
};
