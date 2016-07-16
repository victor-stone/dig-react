import TagField   from './tag-field';

class TagSwap extends TagField
{
  constructor(tagField,filter,defaultValue) {
    super(tagField,defaultValue);
    this._filter       = filter;
    this._propName     = '_unnamed_tag_swap_';
    this._displayName  = '_Un-Named-Tag-Swap_';
  }

  applyToQueryParams(qp) {
    return this._applyTags( qp, ts => ts.remove( ts.filter(this._filter) ).add(this._value) );
  }

  aquireFromQueryParams(qp) {
    return this._aquireTagsValue( qp, ts => ts.filter(this._filter).toString() );
  }
}

module.exports = TagSwap;