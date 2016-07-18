import TagField   from './tag-field';

class TagToggle extends TagField
{
  constructor(tagField,defaultValue,toggledOnValue) {
    super(tagField,defaultValue);
    this._toggledOnValue = toggledOnValue;
    this._displayName    = '_Un-Named-Tag-Toggle_';
  }

  toNative(tags) {
    return this._applyTags( tags, ts => ts.toggle( this._toggledOnValue, this._value) );
  }

  fromNative(tags) {
    super.fromNative(this._aquireTagsValue( tags, ts => ts.contains(this._toggledOnValue) ));
  }
}

module.exports = TagToggle;