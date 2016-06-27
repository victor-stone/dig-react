import Collection    from './collection';
import TagsOwner     from '../mixins/tags-owner';
import { TagString } from '../unicorns';

class TaggedCollection extends TagsOwner(Collection) {

  get tags() {
    return new TagString(this.model.queryParams.tags);
  }

  set tags(tags) {
    this.applyTags(tags);
    return tags;
  }

}

module.exports = TaggedCollection;
