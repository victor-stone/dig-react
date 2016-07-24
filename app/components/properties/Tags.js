import React       from 'react';

import { FormControl }        from '../vanilla/Form';

import { ButtonGroup }        from '../vanilla/ButtonGroups';

import { DualTagFieldWidget,
         BoundStaticTagList } from './../bound/Tags';

import TagsProperty           from '../../models/filters/tags';
import DelayedCommitStore     from '../../stores/tools/delayed-commit';

import ToggleEditModeProperty from './controls/ToggleEditMode';

const TagsPropertyEditorMixin  = baseclass => class extends baseclass
{
  constructor() {
    super(...arguments);

    const { delayCommit, property, store } = this.props;
    
    this._store = delayCommit 
                    ? new DelayedCommitStore(store) 
                    : store;    
    
    this._delayProperty = delayCommit && this._store.addProperty(property);
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
    if( this.props.delayCommit ) {
      this.property.value = this._delayProperty.value;
    }
  }

};

class TagsPropertyEditor extends TagsPropertyEditorMixin(ToggleEditModeProperty) 
{
  get editableElement() {
    return { 
      Element: DualTagFieldWidget, 
      props: {
        store: this._store
      } 
    };
  }

  get staticElement() {
    return {
      Element: BoundStaticTagList, 
      props: { 
        store: this._store
      } 
    }; 
  }
}

class TagsPropertyEditorField extends TagsPropertyEditorMixin(ToggleEditModeProperty.Field) 
{
  get staticElement() {
    return {
      Element: () => <FormControl><BoundStaticTagList store={this.props.store} /></FormControl>, 
      props: {}
    };
  }

  // override vanilla/ToggleEditMode
  get editModeElement() {

    return {
        Element: props => <FormControl className="static-edit">
                            <DualTagFieldWidget store={this.props.store} />
                            <div className="center-text toolbar"><ButtonGroup addons={props.addons} /></div>
                          </FormControl>,
        props: {}      
    };
  }
}

TagsPropertyEditorField.defaultProps =
TagsPropertyEditor.defaultProps = { 
  property: TagsProperty 
};

TagsPropertyEditor.Field = TagsPropertyEditorField;

module.exports = TagsPropertyEditor;

//