
/**
    Manipulate tags with ccHost policies in mind

    tag              := ascii alphanumeric and underscore (depending on the 
                         'ignore' and 'invalid' options)
    tag string       := tags is separated by commas possibly with commas at the
                         start and end of string   
    tag parameter    := can be any one of: 
                            tag string
                            array
                            instance of TagString
    
    Class ensure unique (unordered) values.

    All (most?) parameters are flexible enough to accept strings, arrays or 
    instances of TagString. HOWEVER note that all methods assume that the 
    instance running the method vs.the parameter(s) passed in use the exact
    same rules for invalid, ignoring tags and separator.
    
    If you need to combine or operate with two different set of rules then
    only use instances of TagString and then assume that the instance running
    the methods owns the final outcome.
    
    Creation options are:
        - source     initial tags
        - ignore:    a RegExp of tags to ignore. By default the tag 'all' 
        - invalid:   a RegExp of characters that are not allowed in tags. By 
                     default [^-a-zA-Z0-9_]
        - separator: for when splitting incoming strings and building
                     serialized strings. Default is comma ','
                      
    Examples:     
    
        var tags1 = new TagString( 'foo,bar' );
        
        var tags2 = new TagString( [ 'fee', 'fie' ] );
        
        var tags3 = TagString(tags2,{ separator: ' '}); // conver to space delimited
        
        tags2.add(tags1);  // fee,fie,foo,bar
        tags2.toggle( ['fie','foo'], false ); // fee,bar
        tags3.remove('fee'); // fie
*/

const NOT_FOUND = -1;

function contains(arr,obj) {
  return arr.indexOf(obj) !== NOT_FOUND;
}

function removeObject(arr,obj) {
  arr.splice( arr.indexOf(obj), 1 );
}

function find(arr,matcher)
{
  for( var i = 0; i < arr.length; i++ ) {
    if( matcher(arr[i]) === true ) {
      return true;
    }
  }
  return false;
}

function compare(arr1,arr2,isDiff) {
  isDiff = !!isDiff;

  if( arr1.length < arr2.length ) {
    var tmp = arr1;
    arr1 = arr2;
    arr2 = tmp;
  }

  var obj = {};
  for (var i = 0; i < arr1.length; i++) {
    obj[arr1[i]] = true;
  }

  var result = [];
  for (var n = 0; n < arr2.length; n++) {
    var arr2ObjInArr1 = arr2[n] in obj;
    if( (isDiff && !arr2ObjInArr1) || (!isDiff && arr2ObjInArr1) ) {
      result.push(arr2[n]);
    }
  }

  return result;
}    

function getIntersect(arr1, arr2) {
  return compare(arr1,arr2,false);
}

function getDiff(arr1, arr2) {
  return compare(arr1,arr2,true);
}    

const DEFAULT_IGNORE = /^(\*|all)$/;

class TagString
{
  constructor(src = null, { ignore    = DEFAULT_IGNORE,
                            invalid   = /[^-a-zA-Z0-9_]/, 
                            separator = ','} = {}) {
    
    this.clear = this.removeAll;
    this.includes = this.contains;

    Object.assign(this,{ignore,invalid,separator});

    this._tagsArray = Array.isArray(src) ? src.slice() : TagString.toArray(src,this.opts);
  }

  
  /*
      Editing
  */
  add(tag) {
    
    if( tag instanceof TagString ) {
      if( tag._tagsArray.length ) {
        tag._tagsArray.forEach( t => {
          if( !this._tagsArray.contains(t) ) {
            this._tagsArray.push(t);
          }
        });
      }
      return this;
    }

    var ignore  = this.ignore;
    var invalid = this.invalid;
    var arr     = this._tagsArray;

    function safeAddTag(tag) {
      tag += ''; // stringize
      if( !!tag && 
          tag.match(ignore) === null &&
          tag.match(invalid) === null && 
          !contains(arr,tag) ) 
      {
        arr.push(tag);
      }
    }

    TagString.toArray(tag,this.opts).forEach( safeAddTag );
    return this;
  }
          
  remove(tagSpec) {
    var arr = this._tagsArray;

    function safeRemove(tag) {
        if( contains(arr,tag) ) {
          removeObject(arr,tag);
        }
    }

    TagString.toArray(tagSpec,this.opts).forEach( safeRemove );
    return this;
  }
          
  replace(replaceThisSource,withThisSource) {
    if( replaceThisSource && (replaceThisSource !== withThisSource) ) {
      this.remove(replaceThisSource);
    }
    this.add(withThisSource);
    return this;
  }
          
  removeAll() {
    this._tagsArray = [ ];
    return this;
  }
           
  toggle(tag,flag) {
    if( flag ) {
      this.add(tag);
    } else {
      this.remove(tag);
    }
    return this;
  }
          
  /*
      Queries 
  */
  isEmpty() {
    return this._tagsArray.length === 0;
  }

  contains(tagsOrFunction) {
    if( typeof tagsOrFunction === 'function' ) {
      return find(this._tagsArray, tagsOrFunction) !== false;
    }
    var them = TagString.toArray(tagsOrFunction,this.opts);
    return find( them, tag => this._tagsArray.contains(tag) ) !== false;
  }

  containsOne(tag) {
    return this._tagsArray.contains(tag);
  }

  intersection(other) {
    var ret  = this; 
    if( this._tagsArray.length ) {
      var arr2 = TagString.toArray(other,this.opts);
      if( arr2.length ) {
        var arr1 = this._tagsArray.slice();
        var source = getIntersect(arr1,arr2);
        ret = new TagString(source,this.opts);
      }
    }
    return ret;
  }

  diff(returnTagsOnlyInThisOne) {
    var opts = this.opts;
    var source = getDiff(this._tagsArray.slice(),TagString.toArray(returnTagsOnlyInThisOne,opts));
    return new TagString(source,opts);  
  }

  sort() {
    this._tagsArray.sort();
    return this;
  }

  get hash() {
    return this._tagsArray.slice().sort().join(':');
  }

  isEqual(tags) {
    if( !tags ) {
      return !this._tagsArray.length;
    }
    
    var other = tags instanceof TagString ? tags : new TagString(tags,this.opts);

    if( !this._tagsArray.length || other._tagsArray.length !== this._tagsArray.length ) {
      return false;
    }

    if( this._tagsArray.length === 1 ) {
      return other._tagsArray[0] === this._tagsArray[0];
    }

    return this.hash === other.hash;
  }

  anyInString(stringToSearch) {
    var str = (stringToSearch + '').toLowerCase();
    return this._tagsArray.find( tag => str.includes(tag) );
  }

  anyInArray(arrayOfStringsToSearch) {
    return arrayOfStringsToSearch
              .map( s => s.toLowerCase() )
              .find( this.anyInString.bind(this) );
  }

  getLength() {
    return this._tagsArray.length;
  }

  get length() {
    return this._tagsArray.length;
  }

  /*
      Utilities
  */

  get opts() {
    return {
      ignore: this.ignore,
      invalid: this.invalid,
      separator: this.separator
    };
  }

  clone() {
    return TagString.fromArray( this._tagsArray );
  }

  toString(withSeparator) {
    var tagArr = this._tagsArray;
    if( tagArr.length > 0 ) {
        var sep = withSeparator || this.separator;
        return tagArr.join(sep);
    }
    return '';
  }

  toArray() {
    return this._tagsArray;
  }

  forEach(callback,context) {
    this._tagsArray.forEach(callback,context || this);
    return this;
  }
          
  map(callback,context) {
    return this._tagsArray.map(callback,context || this);
  }
      
  concat(...args) {
    var opts = this.opts;
    this.add( args.reduce( (a,tag) => a.concat(TagString.toArray(tag,opts)), [] ) );
    return this;
  }

  filter(rgx) {
    return new TagString(this._tagsArray.filter(rgx.test.bind(rgx)));
  }
}

TagString.contains = function(source,tag,opts) {
  return new TagString(source,opts).contains(tag);
};        

TagString.forEach = function(source,callback,context,opts) {
  return new TagString(source,opts).forEach(callback,context);
};

TagString.filter = function(source,filter,opts) {
  return new TagString(source,opts).filter(filter);
};

function strToArr(source,ignore,separator) {
  var r = new RegExp(separator,'g');
  return source.replace(r,' ')
                  .split(/\s+/)
                  .filter( t => !!t && !ignore.test(t) );
}

TagString.toArray = function(source,{ ignore    = DEFAULT_IGNORE,
                                      separator = ','}) {
  if( !source ) {
    return [ ];
  }

  var arr = null;
  if( typeof(source) === 'string' ) {
    arr = strToArr(source,ignore,separator);
  } else if( Array.isArray(source) ) {
    arr = source.slice();        
  } else if( source instanceof TagString )  {
    arr = source._tagsArray.slice();        
  } else {
    arr = [ ];
  }
  return arr;
};

TagString.fromArray = (arr, opts) => {
  return new TagString(arr,opts);
};

TagString.fromString = (str, opts = {}) => {
  if( !str ) {
    return new TagString([],opts);
  }
  const { ignore = DEFAULT_IGNORE, separator = ','} = opts;
  return new TagString(strToArr(str,ignore,separator),opts);
};

String.prototype.tagize = function(pretty) {
  var tu = new TagString(this);
  var str = tu.toString();
  if( pretty ) {
    var rx = new RegExp(tu.separator,'g');
    str = str.replace(rx,tu.separator + ' ');
  }
  return str;
};


module.exports = TagString;
