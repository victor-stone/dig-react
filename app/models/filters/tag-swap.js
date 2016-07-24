import TagField   from './tag-field';

class TagSwap extends TagField
{
  constructor(tagField,filter,defaultValue) {
    super(tagField,defaultValue);
    this._filter       = filter;
    this._displayName  = '_Un-Named-Tag-Swap_';
  }

  serialize(tags) {
    return this._applyTags( tags, ts => ts.remove( ts.filter(this._filter) ).add(this._value) );
  }

  deserialize(tags) {
    super.deserialize( this._aquireTagsValue( tags, ts => ts.filter(this._filter).toString() ) );
  }
}

module.exports = TagSwap;