import React             from 'react';
import Filter            from '../../models/filters/tag-inject';
import Input             from './controls/input';

function AddTagsProperty(props) {
  return <Input icon="plus" withDone withCancel {...props} Property={Filter}  />;
}

module.exports = AddTagsProperty;

//