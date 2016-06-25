import React from 'react';

// http://stackoverflow.com/questions/19425165/bootstrap-3-accordion-button-toggle-data-parent-not-working

/*
  Target must be direct decendent of element with className="panel"

  <Outergroup-can-be-div-or-ul-or-any=container id="myGroup">
    <Direct-descendent-of-Outergroup className="panel">
      <C.Toggle group="mygroup" target="mypanel1">{"Show 1st panel"}</C.Toggle>
      <SomeRandomContent />
      <C.Target target="mypanel1">
        <ThisIsHidden until="toggle" is="activated" />
      </C.Target>
    </Direct-descendent-of-Outergroup>
    <Direct-descendent-of-Outergroup className="panel">
      <C.Toggle group="mygroup" target="mypanel2">{"Show 2st panel"}</C.Toggle>
      <SomeRandomContent />
      <C.Target target="mypanel2">
        <ThisIsHidden until="toggle" is="activated" />
      </C.Target>
    </Direct-descendent-of-Outergroup>
  </Outergroup-can-be-div-or-ul-or-any=container>
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
