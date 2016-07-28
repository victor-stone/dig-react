import ToggleEditMode    from '../../vanilla/toggle-edit-mode';
import PropertyState     from '../mixins/property-state';


const ToggleEditModePropertyMixin = tem => class extends PropertyState(tem)
{
  constructor() {
    super(...arguments);
    this.canEdit = this.props.store.permissions.canEdit;
  }
};

class ToggleEditModeProperty extends ToggleEditModePropertyMixin(ToggleEditMode.Static) { }

ToggleEditModeProperty.Field = class extends ToggleEditModePropertyMixin(ToggleEditMode.Field) {

  get title() {
    const { noTitle = false } = this.props;
    return noTitle ? null : this.property.displayName;
  }
};

module.exports = ToggleEditModeProperty;

