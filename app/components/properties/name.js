import React         from 'react';
import NameProperty  from '../../models/properties/name';
import Header        from './controls/header';

function NamePropertyEditor(props) {
  return <Header store={props.store} property={NameProperty} />;
}

module.exports = NamePropertyEditor;

//