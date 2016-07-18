import React     from 'react';

import { DeadLink }     from '../vanilla';

import { ModelTracker } from '../../mixins';


class ResetOptionsButton extends ModelTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.onReset = this.onReset.bind(this);
  }

  stateFromStore(store) {
    return { dirty: store.paramsDirty() };
  }

  onReset() {
    if( this.state.dirty ) {
      this.props.store.applyDefaults();
    }
  }

  render() {
    var resetCls = 'reset-options btn btn-warning btn-sm' + (this.state.dirty ? '' : ' disabled');

    return <DeadLink onClick={this.onReset} className={resetCls} icon="power-off" text="reset" />;
  }

}

module.exports = ResetOptionsButton;
