import React                    from 'react';
import { DualTagFieldWidget }   from '../bound/Tags';

class StemsTagEditor extends React.Component
{
  constructor() {
    super(...arguments);
  }

  render() {
    return <DualTagFieldWidget store={this.props.store} />;
  }
}


module.exports = StemsTagEditor;

