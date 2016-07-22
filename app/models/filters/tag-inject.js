import TagField   from './tag-field';

/*
  Add a tag

  // hello,world
  let tags = store.nativeProperties.tags;

  filter = store.addProperty(TagInject);
  filter.value = 'my_tag';

  // hello,world,my_tag
  tags = store.nativeProperties.tags;

*/
class TagInject extends TagField
{
  constructor() {
    super('tags');
    this._displayName = '_Un-Named-Tag-inject';
  }

  toNative(tags) {
    return this._applyTags( tags, ts => ts.toggle( this._value, true ) );
  }

  fromNative() {
    super.fromNative( '' );
  }
}

module.exports = TagInject;