import TagEnum from './lib/tag-enum';

class UploadType extends TagEnum
{
  constructor(defaultValue = 'remix') {
    super( 'reqtags', defaultValue, Object.keys(UploadType.options) );
    this._displayName  = 'type';
    this._setsDefaultFromNative = true;
  }
}

Object.assign(UploadType,{
  propertyName: 'uploadType',

  options: {
    remix:      'remix',
    acappella:  'a cappella',
    sample:     'stems'
  }

});

module.exports = UploadType;