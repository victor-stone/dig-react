import Query         from './Query';
import TagsOwner     from '../mixins/tags-owner';
import { TagString } from '../unicorns';

class QueryWithTags extends TagsOwner(Query) {

  get tags() {
    return new TagString(this.model.queryParams.tags);
  }

  set tags(tags) {
    this.applyTags(tags);
    return tags;
  }

}

module.exports = QueryWithTags;
