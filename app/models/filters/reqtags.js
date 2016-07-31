import TagsParam from './lib/tags-param';

class ReqTags extends TagsParam
{
  constructor() {
    super({ _displayName: 'reqtags', propName: 'reqtags' });
  }
}

Object.assign(ReqTags,{
  propertyName:  'reqtags',
  Delay:         TagsParam.Delay(ReqTags),
});


module.exports = ReqTags;