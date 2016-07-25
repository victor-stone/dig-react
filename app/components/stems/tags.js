import React                    from 'react';
import { DualTagFieldWidget }   from '../bound/Tags';

class StemsTagEditor extends React.Component
{
  constructor() {
    super(...arguments);
  }

  // TODO: use real defines here
  render() {
    return <DualTagFieldWidget store={this.props.store} cats={['genre','instr']}/>;
  }
}


module.exports = StemsTagEditor;

