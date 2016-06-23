import React              from 'react';
import _UploadDescription from '../models/UploadDescription';
import { ModelTracker }   from '../../mixins';
//import UploadMenu         from './UploadMenu';

//         <UploadMenu store={this.state.store} />

class UploadDescription extends ModelTracker.extender(React.Component)
{
  constructor() {
    super(...arguments);
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.store.model.upload.id !== nextState.store.model.upload.id;
  }

  stateFromStore(store) {
    return { store };
  }

  render() {
    var model = this.state.store.model.upload;

    return(
      <_UploadDescription model={model} />
    );
  }
}


module.exports = UploadDescription;

//