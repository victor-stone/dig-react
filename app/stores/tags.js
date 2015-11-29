import Query           from './query';
import ccmixter        from '../models/ccmixter';
import serialize       from '../models/serialize';
import rsvp            from 'rsvp';
import { TagString }   from '../unicorns';

const REMIX_CATEGORY_NAMES = ['genre', 'instr', 'mood'];

const DEFAULT_CAT = '*';

const MIN_REMIX_TAG_PAIR = 10;
const MIN_SAMPLE_TAG_PAIR = 5;
const SORT_UP = 1;
const SORT_DOWN = -1;

var _tagsCache = {

};

class Tags extends Query {

  constructor() {
    super(...arguments);
    this.selectedTags = {};
    this.selectedTags[DEFAULT_CAT] = new TagString();
  }

  // return a TagString object
  forCategory(category,pairWith) {
    var q = {   
      f:         'js', 
      category:  category,
      pair:      pairWith,
      sort:      'name',
      ord:       'asc',
      dataview: 'tags_with_cat'
    };
    var cached = this._checkCache(q);
    if( cached ) {
      return rsvp.resovle(cached);
    }
    return this.query(q).then( r =>  TagString.create( { source: r.map( t => t.tags_tag ) } ));
  }
  
  // return an array of Tag models
  category(category,pairWith,minCount) {
    var q = {   
      f:        'js', 
      category: category,
      pair:     pairWith,
      sort:     'name',
      ord:      'asc',
      min:      minCount,
      dataview: 'tags'
    };
    var cached = this._checkCache(q);
    if( cached.models ) {
      return rsvp.resolve(cached.models);
    }
    return this.query(q)
            .then( serialize( ccmixter.Tag ) )
            .then( models => {
              this._putCache(cached.key,models);
              return models;
            });
  }
  
  // returns a hash with each category name as a property
  // who's value is an array of objects that were created
  // serializing the json through the Tag models
  categories(categoryNames,pairWith,minCount) {
    var results = { };
    categoryNames.forEach( k => { results[k] = this.category( k, pairWith, minCount ); } );
    return rsvp.hash(results);
  }
  
  searchTags(params) {
    params.dataview = 'tags';
    params.f = 'js';
    return this.query(params).then( serialize( ccmixter.Tag ) );
  }

  sampleCategories() {
    return this.categories( REMIX_CATEGORY_NAMES, 'sample', MIN_SAMPLE_TAG_PAIR )
      .then( cats => {
          var allTags = [];
          for( var k in cats ) {
            allTags = allTags.concat(cats[k]);
          }
          allTags.sort( function(a,b) { return a.id > b.id ? SORT_UP : SORT_DOWN; } );
          return allTags;
        });
  }

  remixCategories() {
    return this.categories( REMIX_CATEGORY_NAMES, 'remix', MIN_REMIX_TAG_PAIR );
  }

  remixCategoryNames() {
    return REMIX_CATEGORY_NAMES;
  }

  remixGenres() {
    return this.forCategory('genre','remix');
  }

  _makeCacheKey(params) {
    var keyo = {};
    Object.keys(params).sort().forEach( k => keyo[k] = params[k] );    
    return JSON.stringify(keyo);
  }

  _checkCache(params) {
    var key = this._makeCacheKey(params);
    return { models: _tagsCache[ key ], key, category: params.category };
  }

  _putCache(key,tags) {
    _tagsCache[ key ] = tags;
  }
}

module.exports = Tags;
