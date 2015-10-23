import Query           from './query';
import ccmixter        from '../models/ccmixter';
import serialize       from '../models/serialize';
import rsvp            from 'rsvp';
import TagString       from '../unicorns/tagString';

var remixCategoryNames = ['genre', 'instr', 'mood'];
var minRemixesForTags = 10;


var Tags = Query.extend({

  selectedTags: new TagString(),


  addSelected: function(tag) {
    this.selectedTags.add(tag);
    this.emit('selectedTags',this.selectedTags);
  },

  removeSelected: function(tag) {
    this.selectedTags.remove(tag);
    this.emit('selectedTags',this.selectedTags);
  },

  toggleSelected: function(tag,flag) {
    this.selectedTags.toggle(tag,flag);
    this.emit('selectedTags',this.selectedTags);
  },

  clearSelected: function() {
    this.selectedTags.clear();
    this.emit('selectedTags',this.selectedTags);    
  },

  // return a TagUtils object
  forCategory: function(category,pairWith) {
    var q = {   
      f:         'json', 
      category:  category,
      pair:      pairWith,
      sort:      'name',
      ord:       'asc',
      dataview: 'tags_with_cat'
    };
    return this.query(q).then( r =>  TagString.create( { source: r.map( t => t.tags_tag ) } ));
  },
  
  // return an array of Tag models
  category: function(category,pairWith,minCount) {
    var q = {   
      f:        'json', 
      category: category,
      pair:     pairWith,
      sort:     'name',
      ord:      'asc',
      min:      minCount,
      dataview: 'tags'
    };
    return this.query(q).then( serialize( ccmixter.Tag ) );
  },
  
  // returns a hash with each category name as a property
  // who's value is an array of objects that were created
  // serializing the json through the Tag models
  categories: function(categoryNames,pairWith,minCount) {
    var results = { };
    categoryNames.forEach( k => { results[k] = this.category( k, pairWith, minCount ); } );
    return rsvp.hash(results);
  },
  
  searchTags: function(params) {
    params.dataview = 'tags';
    params.f = 'json';
    return this.query(params).then( serialize( ccmixter.Tag ) );
  },

  remixCategories: function() {
    return this.categories( remixCategoryNames, 'remix', minRemixesForTags );
  },
  
  remixCategoryNames: function() {
    return remixCategoryNames;
  },
  
  remixGenres:  function() {
    return this.forCategory('genre','remix');
  },

});

Tags.service = new Tags();

module.exports = Tags;
