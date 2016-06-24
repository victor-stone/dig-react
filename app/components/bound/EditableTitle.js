import React            from 'react';
import Glyph            from '../vanilla/Glyph';
import { InputText }    from './InputField';
import { ModelTracker } from '../../mixins';

class _EditableTitle extends React.Component
{
  render() {
    const { icon = 'music', store } = this.props;
    return (
        <div className="page-header"> 
          <h1 className="center-text">
            <Glyph icon={icon} /> 
            {" "}
            <InputText store={store} propName="name" />
          </h1>
        </div>
      );
  }
}

class EditableTitle extends ModelTracker.extender(_EditableTitle) {
  stateFromStore(store) {
    return {store};
  }
}

module.exports = EditableTitle;

//