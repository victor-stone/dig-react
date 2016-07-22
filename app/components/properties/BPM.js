import React        from 'react';
import Property     from '../../models/properties/bpm';
import InputToggle  from './controls/InputToggle';

function BPMProperty(props) {
  return <InputToggle store={props.store} property={Property} />;
}

module.exports = BPMProperty;

//