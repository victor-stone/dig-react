import {TagsOwner}  from '../mixins';
import {TagString} from '../unicorns';
import Eventer from '../services/Eventer';
import events from '../models/events';

/*
  Pretends to be store to Tags components

  Normally the store would commit each tag
  assignment but will wait until the 'commitTags'
  method is called to commit the tags to the
  underlying wrapped store
*/
class DelayedCommitTagStore extends TagsOwner(Eventer)
{
  constructor(realStore) {
    super();
    this._realStore = realStore;
    // assign manually since it's copy on read
    // and don't fire event
    this._str = this._realStore.tags;
  }

  get tags() {
    return new TagString(this._str);
  }

  set tags(ts) {
    this._str = new TagString(ts);
    this.emit(events.TAGS_SELECTED,this._str);
  }

  commitTags() {
    this._realStore.tags = this.tags;
  }

  resetTags() {
    // assign through property setter because it's copy on write
    // and fire event
    this.tags = this._realStore.tags;
  }

  get permissions() {
    return this._realStore.permissions;
  }
}

module.exports = DelayedCommitTagStore;