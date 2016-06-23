import React       from 'react';
import Glyph       from '../vanilla/Glyph';
import {InputText} from './InputField';

function EditableTitle(props)
{
  const { icon = 'music' } = props;
  return (
      <div className="page-header"> 
        <h1 className="center-text">
          <Glyph icon={icon} /> 
          {" "}
          <InputText store={props.store} propName="name" />
        </h1>
      </div>
    );
}


module.exports = EditableTitle;

//