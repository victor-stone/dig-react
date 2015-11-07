import Query           from './query';
import ccmixter        from '../models/ccmixter';
import serialize       from '../models/serialize';
import rsvp            from 'rsvp';
import { TagString }   from '../unicorns';

var remixCategoryNames = ['genre', 'instr', 'mood'];
var minRemixesForTags = 10;


class Tags extends Query {

  constructor() {
    super(...arguments);
    this.selectedTags = {};
  }

  addSelected(tag,cat) {
    cat = this._ensureSelectedCat(cat);
    this.selectedTags[cat].add(tag);
    this._emitSelectedTags(cat,true);
  }

  removeSelected(tag,cat) {
    if( !cat ) {
      cat = this._findCatFromTag(tag);
      if( !cat ) {
        return;
      }
    }
    this.selectedTags[cat].remove(tag);
    this._emitSelectedTags(cat,true);
  }

  toggleSelected(tag,flag,cat) {
    cat = this._ensureSelectedCat(cat);
    this.selectedTags[cat].toggle(tag,flag);
    this._emitSelectedTags(cat,true);
  }

  clearSelected() {
    for( var cat in this.selectedTags ) {      
      this.selectedTags[cat].clear();
      this._emitSelectedTags(cat,false);
    }
    this._emitSelectedTags(null,true);
  }

  _ensureSelectedCat(cat) {
    if( !cat ) {
      cat = '*';
    }
    if( !(cat in this.selectedTags ) ) {
      this.selectedTags[cat] = TagString();
    }
    return cat;
  }

  getSelectedTags(cat) {
    if( cat ) {
      if( cat in this.selectedTags ) {
        return this.selectedTags[cat];
      }
      return new TagString();
    }
    var allTags = TagString();
    for( var cat2 in this.selectedTags ) {
      allTags.add( this.selectedTags[cat2] );
    }
    return allTags;
  }

  _emitSelectedTags(cat,doAll) {
    var tags = this.getSelectedTags(cat);
    if( cat ) {
      this.emit('selectedCatTags',tags,cat);      
    }
    if( doAll ) {
      if( cat ) {
        tags = this.getSelectedTags();
      }
      this.emit( 'selectedTags', tags );
    }
  }

  _findCatFromTag(tag) {
    for( var cat in this.selectedTags ) {
      if( this.selectedTags[cat].contains(tag) ) {
        return cat;
      }
    }
    return '*';
  }

  // return a TagString object
  forCategory(category,pairWith) {
    var q = {   
      f:         'json', 
      category:  category,
      pair:      pairWith,
      sort:      'name',
      ord:       'asc',
      dataview: 'tags_with_cat'
    };
    return this.query(q).then( r =>  TagString.create( { source: r.map( t => t.tags_tag ) } ));
  }
  
  // return an array of Tag models
  category(category,pairWith,minCount) {
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
    params.f = 'json';
    return this.query(params).then( serialize( ccmixter.Tag ) );
  }

  remixCategories() {
    return this.categories( remixCategoryNames, 'remix', minRemixesForTags );
  }
  
  remixCategoryNames() {
    return remixCategoryNames;
  }
  
  remixGenres() {
    return this.forCategory('genre','remix');
  }

}

Tags.service = new Tags();

module.exports = Tags;
