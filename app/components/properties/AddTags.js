import React             from 'react';
import Filter            from '../../models/filters/tag-inject';
import Input             from './controls/Input';

function AddTagsProperty(props) {
  return <Input icon="plus" withDone withCancel {...props} property={Filter}  />;
}

module.exports = AddTagsProperty;

//