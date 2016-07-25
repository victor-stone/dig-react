import React       from 'react';

import { FormControl }        from '../vanilla/Form';

import { ButtonGroup }        from '../vanilla/ButtonGroups';

import { DualTagFieldWidget,
         BoundStaticTagList } from './../bound/Tags';

import Filter                 from '../../models/filters/tags';

import ToggleEditModeProperty from './controls/ToggleEditMode';

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
        property: this.PropertyClass
      } 
    };
  }

  get staticElement() {
    return {
      Element: BoundStaticTagList, 
      props: { 
        store: this.props.store,
        property: this.PropertyClass
      } 
    }; 
  }
}

class TagsPropertyEditorField extends TagsPropertyEditorMixin(ToggleEditModeProperty.Field) 
{
  get staticElement() {
    return {
      Element: props => <FormControl><BoundStaticTagList property={props.property} store={props.store} /></FormControl>, 
      props: {
        store: this.props.store,
        property: this.PropertyClass
      }
    };
  }

  // override vanilla/ToggleEditMode
  get editModeElement() {

    return {
        Element: props => <FormControl className="static-edit">
                            <DualTagFieldWidget store={props.store} property={props.property} />
                            <div className="center-text toolbar"><ButtonGroup addons={props.addons} /></div>
                          </FormControl>,
      props: {
        store: this.props.store,
        property: this.PropertyClass
      }
    };
  }
}

TagsPropertyEditor.Field = TagsPropertyEditorField;

module.exports = TagsPropertyEditor;

//