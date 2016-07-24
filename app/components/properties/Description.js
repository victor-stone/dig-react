import React               from 'react';
import DescriptionProperty from '../../models/properties/description';
import TextArea            from './controls/TextArea';

function DescriptionPropertyEditor(props) {
  const { store, collapsible, noTitle } = props;

  return (<TextArea 
            noTitle={noTitle}
            collapsible={collapsible} 
            store={store} 
            property={DescriptionProperty} 
          />);
}

module.exports = DescriptionPropertyEditor;

//