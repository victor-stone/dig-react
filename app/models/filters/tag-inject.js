import TagField   from './lib/tag-field';

/*
  Add a tag
  
  let tags = store.nativeProperties.tags; // hello,world

  filter = store.addProperty(TagInject);
  filter.value = 'my_tag';

  tags = store.nativeProperties.tags;  // hello,world,my_tag

*/
class TagInject extends TagField
{
  constructor() {
    super('tags');
    this._displayName = '_Un-Named-Tag-inject';
  }

  serialize(tags) {
    return this._applyTags( tags, ts => ts.toggle( this._value, true ) );
  }

  // this prop is write only
  
  deserialize() {    
  }
}

TagInject.propertyName = 'tag-inject';

module.exports = TagInject;