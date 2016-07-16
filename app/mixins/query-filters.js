
const TagsOwner = target => class extends target {

  get tags() {
    throw new Error('tags property called on derivation that does not support it');
  }
  
  set tags(tags) {
    throw new Error('tags setter called with '+tags+' on derivation that does not support it');
  }

  toggleTag(tag,toggle) {
    this.tags = this.tags.toggle(tag,toggle);
  }

  clearTags() {
    this.tags = this.tags.removeAll();
  }

};

module.exports = TagsOwner;