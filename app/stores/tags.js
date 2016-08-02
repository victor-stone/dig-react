import Query           from './query';
import ccmixter        from '../models/ccmixter';
import serialize       from '../models/serialize';
import rsvp            from 'rsvp';
import { TagString,
         LibArray,
         hashParams }  from 'unicorns';

const REMIX_CATEGORY_NAMES = ['genre', 'instr', 'mood'];

const MIN_REMIX_TAG_PAIR = 10;
const MIN_SAMPLE_TAG_PAIR = 5;
const SORT_UP = 1;
const SORT_DOWN = -1;

var _tagsCache = new Map();

class Tags extends Query {

  constructor() {
    super(...arguments);
    this.typeValues = LibArray.from( Tags.categories.types, t => Tags.categories.types[t] );
  }

  // return a TagString object
  forCategory(category,pairWith,batchName) {
    var q = {   
      category:  category,
      pair:      pairWith,
      sort:      'name',
      ord:       'asc',
      dataview: 'tags_with_cat'
    };
    var cached = this._checkCache(q);
    if( cached.models ) {
      return rsvp.resolve(cached.models);
    }
    return this.query(q,batchName).then( r =>  {
      var results = new TagString( r.map( t => t.tags_tag ) );
      this._putCache(cached.key,results);
      return results;
    });
  }
  
  // return a big fat TagString
  forCategories(categories,pairWith) {
    var hash = {};
    categories.forEach( c => { hash[c] = this.forCategory(c,pairWith,c); } );
    return this.flushBatch(hash).then( arr => new TagString().concat(...arr) );
  }
  
  // return an array of Tag models
  category(category,pairWith,minCount,batchName) {
    var isType = this.typeValues.contains(category); 
    var q = {   
      category: (!isType && category) || undefined,
      type:     (isType && category) || undefined,
      pair:     pairWith,
      sort:     'name',
      ord:      'asc',
      min:      minCount,
      dataview: 'tags'
    };
    return this._fetch(q,batchName);
  }
  
  _fetch(q,batchName) {
    var cached = this._checkCache(q);
    if( cached.models ) {
      return rsvp.resolve(cached.models);
    }
    return this.query(q,batchName)
            .then( serialize( ccmixter.Tags.Tag ) )
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
    categoryNames.forEach( k => { results[k] = this.category( k, pairWith, minCount, k ); } );
    return this.flushBatch(results);
  }
  
  searchTags(tags,batchName) {
    var t = (new TagString(tags)).toArray();
    if( t.length === 0 ) {
      return rsvp.resolve([]);
    }
    var r = new RegExp('(' + t.join('|') + ')');
    return this.remixCategories(batchName).then( cats => {
      return this._contactCats(cats).filter( t => t.id.match(r) );
    });
  }

  sampleCategories(batchName) {
    return this.categories( REMIX_CATEGORY_NAMES, 'sample', MIN_SAMPLE_TAG_PAIR , batchName )
      .then( cats => {
          var allTags = this._contactCats(cats);
          allTags.sort( function(a,b) { return a.id > b.id ? SORT_UP : SORT_DOWN; } );
          return allTags;
        });
  }

  remixCategories(batchName) {
    return this.categories( REMIX_CATEGORY_NAMES, 'remix', MIN_REMIX_TAG_PAIR, batchName );
  }

  remixCategoryNames() {
    return REMIX_CATEGORY_NAMES;
  }

  remixGenres(batchName) {
    return this.forCategory('genre','remix',batchName);
  }

  _checkCache(params) {
    var key = hashParams(params);
    return { models: _tagsCache.get(key), key, category: params.category };
  }

  _putCache(key,tags) {
    _tagsCache.set(key,tags);
  }
  
  _contactCats(cats) {
    var allTags = [];
    for( var k in cats ) {
      allTags = allTags.concat(cats[k]);
    }
    return allTags;
  }
}

Tags.categories = {
  GENRE:      'genre',
  INSTRUMENT: 'instr',
  MOOD:       'mood',
  types: {
    SYSTEM: 'system',
    ADMIN:  'admin',
    USER: 'user',
    ASSIGNABLE: 'system:assignable'
  }
};

module.exports = Tags;
