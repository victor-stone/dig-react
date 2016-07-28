import React       from 'react';

import { FormControl }        from '../vanilla/form';

import { ButtonGroup }        from '../vanilla/button-groups';

import { DualTagFieldWidget,
         BoundStaticTagList } from './../bound/tags';

import Filter                 from '../../models/filters/tags';

import ToggleEditModeProperty from './controls/toggle-edit-mode';

/*
  This is used for editing the 'tags' property or query filter
  in its entirty. Individual tags (like bpm_*, instrumental, etc.)
  is done elsewhere
*/
const TagsPropertyEditorMixin  = baseclass => class extends baseclass
{
  get PropertyClass() {
    return this.props.delayCommit ? Filter.Delay : Filter;
  }

  get canEdit() {
    return super.canEdit && this.props.canEdit !== false;
  }

  set canEdit(val) {
    super.canEdit = val;
  }

  onCancel() {
    this.property.reset();
  }
  
  onDone() {
    // it looks weird but setting editable = editable
    // will signal to the filter to commit the editable
    // value 
    this.updateValue(this.property.editable);
  }  
};

class TagsPropertyEditor extends TagsPropertyEditorMixin(ToggleEditModeProperty) 
{
  get editableElement() {
    return { 
      Element: DualTagFieldWidget, 
      props: {
        store: this.props.store,
        Property: this.PropertyClass
      } 
    };
  }

  get staticElement() {
    return {
      Element: BoundStaticTagList, 
      props: { 
        store: this.props.store,
        Property: this.PropertyClass
      } 
    }; 
  }
}

class TagsPropertyEditorField extends TagsPropertyEditorMixin(ToggleEditModeProperty.Field) 
{
  get staticElement() {
    return {
      Element: props => <FormControl><BoundStaticTagList Property={props.property} store={props.store} /></FormControl>, 
      props: {
        store: this.props.store,
        Property: this.PropertyClass
      }
    };
  }

  // override vanilla/ToggleEditMode
  get editModeElement() {

    return {
        Element: props => <FormControl className="static-edit">
                            <DualTagFieldWidget store={props.store} Property={props.property} />
                            <div className="center-text toolbar"><ButtonGroup addons={props.addons} /></div>
                          </FormControl>,
      props: {
        store: this.props.store,
        Property: this.PropertyClass
      }
    };
  }
}

TagsPropertyEditor.Field = TagsPropertyEditorField;

module.exports = TagsPropertyEditor;

//