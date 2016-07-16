import TagEnum from './tag-enum';

class UploadType extends TagEnum
{
  constructor(defaultValue) {
    super( 'reqtags', defaultValue, Object.keys(UploadType.options) );
    this._propName     = UploadType.name,
    this._displayName  = 'type';
  }
}

Object.assign(UploadType,{
  filterName: 'uploadType',

  fromQueryParams(qp) {
    const filter = new UploadType();
    filter.aquireFromQueryParams(qp);
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