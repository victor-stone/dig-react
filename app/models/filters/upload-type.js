import TagEnum from './tag-enum';

class UploadType extends TagEnum
{
  constructor(defaultValue = 'remix') {
    super( 'reqtags', defaultValue, Object.keys(UploadType.options) );
    this._displayName  = 'type';
  }
}

Object.assign(UploadType,{
  propertyName: 'uploadType',

  fromValue(qp) {
    const filter = new UploadType();
    filter.fromNative(qp);
    filter._defaultValue = filter._value;
    return filter;    
  },

  options: {
    remix:      'remix',
    acappella:  'a cappella',
    sample:     'stems'
  }

});
module.exports = UploadType;