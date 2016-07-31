import TagsParam from './lib/tags-param';

class OneOf extends TagsParam
{
  constructor() {
    super({ _displayName: 'oneof', propName: 'oneof' });
  }
}

Object.assign(OneOf,{
  propertyName:  'oneof',
  Delay:         TagsParam.Delay(OneOf),
});


module.exports = OneOf;