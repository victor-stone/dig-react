import QueryFilter   from '../query-filter';
import { TagString } from '../../unicorns';

class TagField extends QueryFilter
{
  constructor(tagField,defaultValue = null) {
    super();
    this._defaultValue = defaultValue;
    this._propName     = tagField;
    this._displayName  = '_Un-Named-Tag-Field_';
  }

  _applyTags(tags,cb) {
    return cb(this._tsFromQP(tags)).toString();
  }

  _aquireTagsValue(qp,cb) {
    this._value = cb(this._tsFromQP(qp)[0]);
    return this;
  }

  _tsFromQP(maybeTS) {
    return maybeTS instanceof TagString ? maybeTS : new TagString(maybeTS);
  }
}

module.exports = TagField;