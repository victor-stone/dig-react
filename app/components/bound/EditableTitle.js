import React            from 'react';
import Glyph            from '../vanilla/Glyph';
import { BoundInputText }    from './InputField';
import { ModelTracker } from '../../mixins';

// FIXME: Edit controls styles on EditableTitle are wacky

class EditableTitle extends ModelTracker(React.Component)
{
  render() {
    const { icon = 'music', store } = this.props;
    return (
        <div className="page-header"> 
          <h1 className="center-text">
            <Glyph icon={icon} /> 
            {" "}
            <BoundInputText store={store} propName="name" />
          </h1>
        </div>
      );
  }
}


module.exports = EditableTitle;

//