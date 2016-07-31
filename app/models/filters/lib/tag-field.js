import QueryFilter        from '../../query-filter';
import PropertyTranslator from '../../property-translator';
import { TagString }      from 'unicorns';

/*
  Derivations are assumed to hold one tag (or a
  stable number of them) that are applied to
  an external set of tags.

  For example if you have a a ?tags= query
  parameter that may or may not include
  a tag called foobar as an option you
  would implement a tag-toggle that would
  toggle the presense of the 'foobar' 

  @param tagField determins the name of the
                  query parameter as in ?tagField
*/
class TagField extends PropertyTranslator(QueryFilter)
{
  constructor(tagField,defaultValue = null) {
    super();
    this._defaultValue = defaultValue;
    this._propName     = tagField;
    this._displayName  = '_Un-Named-Tag-Field_';
  }

  // apply our value to these incoming tags
  // derived classes implement callback
  _applyTags(tags,cb) {
    return cb(this._tsFromQP(tags)).toString();
  }

  // use the incoming queryParams as a seed for 
  // our value
  // derived classes implement callback
  _aquireTagsValue(tags,cb) {
    return cb(this._tsFromQP(tags));
  }

  _tsFromQP(maybeTS) {
    return maybeTS instanceof TagString ? maybeTS : new TagString(maybeTS);
  }
}

module.exports = TagField;