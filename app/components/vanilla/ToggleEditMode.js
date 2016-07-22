import React         from 'react';
import { Field }     from './Form';
import EditControls  from './mixins/EditControls';
import EditButton    from './EditButton';

class ToggleEditMode extends EditControls(React.Component)
{
  constructor() {
    super(...arguments);
  }

  get canEdit() {
    return this._canEdit;
  }

  set canEdit(val) {
    this._canEdit = val;
  }
  
  get editableElement() {
    return null;
  }

  get staticElement() {
    return null;
  }

  get staticFieldElement() {
    return null;
  }
  
  get title() {
    return  null;
  }

  render() {

    const { Static = this.staticElement, 
            canEdit = this.canEdit,
            stickyOpen 
          } = this.props;

    const showEdit = stickyOpen || (canEdit && this.state.editing);

    if( Static && !showEdit ) {
      if( canEdit ) {
        return <div className="can-edit">{Static}<EditButton onEdit={this.handler('onEdit')} /></div>;
      } else {
        return Static;
      }
    }

    const { title = this.title, 
            className, 
             
            Editable = this.editableElement, 
            StaticField = this.staticFieldElement } 
            = this.props;

    const postfix = canEdit ? this.inputAddOns : undefined;
    
    return (
        <Field title={title} className={className} postfix={postfix}>
          {showEdit ? Editable : StaticField}
        </Field>
      );
  }
}

 
module.exports = ToggleEditMode;

