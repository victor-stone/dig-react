import TagField   from './tag-field';

class TagToggle extends TagField
{
  constructor(tagField,defaultValue,toggledOnValue) {
    super(tagField,defaultValue);
    this._toggledOnValue = toggledOnValue;
    this._propName       = '_unnamed_tag_toggle_';
    this._displayName    = '_Un-Named-Tag-Toggle_';
  }

  applyToQueryParams(qp) {
    return this._applyTags( qp, ts => ts.toggle( this._toggledOnValue, this._value) );
  }

  aquireFromQueryParams(qp) {
    return this._aquireTagsValue( qp, ts => ts.contains(this._toggledOnValue) );
  }
}

module.exports = TagToggle;