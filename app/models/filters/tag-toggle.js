import TagField   from './tag-field';

class TagToggle extends TagField
{
  constructor(tagField,defaultValue,toggledOnValue) {
    super(tagField,defaultValue);
    this._toggledOnValue = toggledOnValue;
    this._displayName    = '_Un-Named-Tag-Toggle_';
  }

  serialize(tags) {
    return this._applyTags( tags, ts => ts.toggle( this._toggledOnValue, this._value) );
  }

  deserialize(tags) {
    super.deserialize( this._aquireTagsValue( tags, ts => ts.contains(this._toggledOnValue) ));
  }
}

module.exports = TagToggle;