import ToggleEditMode    from '../../vanilla/ToggleEditMode';
import PropertyState     from '../mixins/PropertyState';

class ToggleEditModeProperty extends PropertyState(ToggleEditMode)
{
  constructor() {
    super(...arguments);
    this.canEdit = this.props.store.permissions.canEdit;
  }

  get title() {
    const { noTitle = false } = this.props;
    return noTitle ? null : this.property.displayName;
  }
}

module.exports = ToggleEditModeProperty;

