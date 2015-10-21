import Query           from './query';
import ccmixter        from '../models/ccmixter';
import serialize       from '../models/serialize';
import rsvp            from 'rsvp';
import TagString       from '../unicorns/tagString';

var Tags = Query.extend({

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
    return this.query(q).then( r =>  TagUtils.create( { source: r.map( t => t.tags_tag ) } ));
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
  // who's value is an array of Tag models
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
});

Tags.service = new Tags();

module.exports = Tags;
