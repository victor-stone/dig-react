import TagSwap   from './tag-swap';

class TagEnum extends TagSwap
{
  constructor(tagField,defaultValue,tags) {
    super(tagField,new RegExp('^(' + tags.join('|') + ')$'),defaultValue);
    this._displayName  = '_Un-Named-Tag-Enum_';
  }
}

module.exports = TagEnum;