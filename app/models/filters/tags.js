import TagsParam from './lib/tags-param';

/*
  Represents an entire set of tags
*/
class Tags extends TagsParam
{
  constructor() {
    super({ _displayName: 'tags', propName: 'tags' });
  }
}

Object.assign(Tags,{
  propertyName:  'tags',
  Delay:         TagsParam.Delay(Tags),
});


module.exports = Tags;