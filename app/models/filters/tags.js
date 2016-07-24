import QueryFilter     from '../query-filter';
import { TagString }   from '../../unicorns';

class Tags extends QueryFilter
{
  constructor() {
    super(...arguments);
    
    this._propName    = 'tags';
    this._displayName = 'tags';

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
    return val.toString();
  }

  deserialize(val) {
    super.deserialize((val || '').toString());
  }

  serialize() {
    return this._value;
  }

  toggle( tag, toggle ) {
    this.value = this.value.toggle(tag,toggle);
  }

  get isDirty() {
    // does not participate in 'reset'
    return false; 
  }
  
}

Tags.propertyName = 'Tags';

module.exports = Tags;