import React             from 'react';
import Tree              from './Tree';
import { ModelTracker,
         PopPeruseModel }  from '../../mixins';

/*
  Present a node in the RemixTree (aka Upload Page)
*/
class RemixTree extends PopPeruseModel(ModelTracker.extender(React.Component))
{
  stateFromStore(store) {
   return { store };
  }

  render() {
    return  ( 
      <Tree store={this.state.store} />
    );
  }

}

module.exports = RemixTree;
