import Query           from './query';
import ccmixter        from '../models/ccmixter';
import serialize       from '../models/serialize';
import rsvp            from 'rsvp';
import TagString       from '../unicorns/tagString';

var remixCategoryNames = ['genre', 'instr', 'mood'];
var minRemixesForTags = 10;


var Tags = Query.extend({

  selectedTags: {},

  addSelected: function(tag,cat) {
    cat = this._ensureSelectedCat(cat);
    this.selectedTags[cat].add(tag);
    this._emitSelectedTags(cat,true);
  },

  removeSelected: function(tag,cat) {
    if( !cat ) {
      cat = this._findCatFromTag(tag);
      if( !cat ) {
        return;
      }
    }
    this.selectedTags[cat].remove(tag);
    this._emitSelectedTags(cat,true);
  },

  toggleSelected: function(tag,flag,cat) {
    cat = this._ensureSelectedCat(cat);
    this.selectedTags[cat].toggle(tag,flag);
    this._emitSelectedTags(cat,true);
  },

  clearSelected: function() {
    for( var cat in this.selectedTags ) {      
      this.selectedTags[cat].clear();
      this._emitSelectedTags(cat,false);
    }
    this._emitSelectedTags(null,true);
  },

  _ensureSelectedCat: function(cat) {
    if( !cat ) {
      cat = '*';
    }
    if( !(cat in this.selectedTags ) ) {
      this.selectedTags[cat] = TagString();
    }
    return cat;
  },

  _emitSelectedTags: function(cat,doAll) {
    if( cat ) {
      this.emit('selectedCatTags',this.selectedTags[cat],cat);      
    }
    if( doAll ) {
      var allTags = TagString();
      for( var cat2 in this.selectedTags ) {
        allTags.add( this.selectedTags[cat2] );
      }
      this.emit( 'selectedTags', allTags );
    }
  },

  _findCatFromTag: function(tag) {
    for( var cat in this.selectedTags ) {
      if( this.selectedTags[cat].contains(tag) ) {
        return cat;
      }
    }
    return '*';
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
