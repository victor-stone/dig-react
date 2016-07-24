import ToggleEditMode    from '../../vanilla/ToggleEditMode';
import PropertyState     from '../mixins/PropertyState';


const ToggleEditModePropertyMixin = tem => class extends PropertyState(tem)
{
  constructor() {
    super(...arguments);
    this.canEdit = this.props.store.permissions.canEdit;
  }

  get title() {
    const { noTitle = false } = this.props;
    return noTitle ? null : this.property.displayName;
  }
};

class ToggleEditModeProperty extends ToggleEditModePropertyMixin(ToggleEditMode.Static) { }

ToggleEditModeProperty.Field = class extends ToggleEditModePropertyMixin(ToggleEditMode.Field) {};

module.exports = ToggleEditModeProperty;

