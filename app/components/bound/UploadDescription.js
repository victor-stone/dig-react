import React              from 'react';
import UploadDescription from '../models/UploadDescription';
import { ModelTracker }   from '../../mixins';

class BoundUploadDescription extends ModelTracker(React.Component)
{
  constructor() {
    super(...arguments);
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.store.model.upload.id !== nextState.store.model.upload.id;
  }

  render() {
    var model = this.state.store.model.upload;

    return(
      <UploadDescription model={model} />
    );
  }
}


module.exports = BoundUploadDescription;

//