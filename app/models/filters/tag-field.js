import QueryFilter   from '../query-filter';
import { TagString } from '../../unicorns';

class TagField extends QueryFilter
{
  constructor(tagField,defaultValue = null) {
    super();
    this._defaultValue = defaultValue;
    this._tagField     = tagField;
    this._propName     = '_unnamed_tag_field_';
    this._displayName  = '_Un-Named-Tag-Field_';
  }

  _applyTags(qp,cb) {
    const [ ts, isTS ] = this._tsFromQP(qp);
    cb(ts);
    !isTS && (qp[this._tagField] = ts.toString());
    return this;
  }

  _aquireTagsValue(qp,cb) {
    this._value = cb(this._tsFromQP(qp)[0]);
    return this;
  }

  _tsFromQP(qp) {
    const maybeTS   = qp[this._tagField];
    const isTS      = maybeTS instanceof TagString;
    const ferSureTS = isTS ? maybeTS : new TagString(maybeTS);
    return [ ferSureTS, isTS ];    
  }
}

module.exports = TagField;