import React       from 'react';

import { FormControl }        from '../vanilla/Form';

import { safeSetState }       from '../../unicorns';

import { DualTagFieldWidget,
         BoundStaticTagList } from './../bound/Tags';

import TagsProperty           from '../../models/filters/tags';
import DelayedCommitStore     from '../../stores/tools/delayed-commit';

import ToggleEditModeProperty from './controls/ToggleEditMode';


class TagsPropertyEditor extends ToggleEditModeProperty
{
  constructor() {
    super(...arguments);

    const { delayCommit, property, store } = this.props;
    
    this._store = delayCommit ? new DelayedCommitStore(store) : store;    
    
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

  get editableElement() {
    return <DualTagFieldWidget store={this._store} />;
  }

  get staticFieldElement() {
    return this.props.static ? null : <FormControl><BoundStaticTagList store={this._store} /></FormControl>;
  }

  get staticElement() {
    return this.props.static ? <BoundStaticTagList store={this._store} /> : null;
  }
}

TagsPropertyEditor.defaultProps = { property: TagsProperty };

module.exports = TagsPropertyEditor;

//