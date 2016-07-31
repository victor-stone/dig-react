import QueryFilter        from '../../query-filter';
import PropertyCollection from '../../property-collection';
import PropertyTranslator from '../../property-translator';
import { TagString }      from 'unicorns';

/*
  Represents an entire set of tags
*/
class TagsParam extends PropertyCollection(PropertyTranslator(QueryFilter))
{
  constructor() {
    super(...arguments);
    this._setsDefaultFromNative = true; // really..?
  }

  // we going to keep a native string in
  // _value and we're going to hand
  // out a TagString b/c you wouldn't
  // ask for it if you weren't going 
  // to start manipulating it.

  toAbstract() {
    return TagString.fromString(this._value);
  }

  // we accept either String or TagString
  // note: this will trigger a prop change
  // event

  fromAbstract(val) {
    return (val || '').toString();
  }

  get editable() {
    return this.toAbstract();
  }

  set editable(val) {
    this.value = val;
  }

  deserialize(val) {
    super.deserialize((val || '').toString());
  }

  toggle( tag, toggle ) {
    this.value = this.value.toggle(tag,toggle);
  }

  get isDirty() {
    // does not participate in 'reset'
    return false; 
  }
  
}

TagsParam.Delay = function( base ) {
  return class TagsDelayCommit extends base
          {
            toggle( tag, toggle ) {
              this._editable = this.editable.toggle(tag, toggle).toString();
              this.onChange();
            }

            get editable() {
              if( typeof this._editable === 'undefined' ) {
                this._editable = this._value;
              }
              return TagString.fromString(this._editable);
            }
          };
};

module.exports = TagsParam;