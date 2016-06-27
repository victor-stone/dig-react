import Model from '../model';

class Tag extends Model {
  constructor() {  
    super(...arguments);
    this.getName = 
    this.getId = function() {
      return this.tags_tag + '';
    };
    this.countBinding = 'tags_count';
  }
}

module.exports = {
  Tag
};
