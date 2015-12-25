
/**
    Manipulate tags with ccHost policies in mind

    tag              := ascii alphanumeric and underscore
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
                     default [^a-zA-Z0-9_]
        - separator: for when splitting incoming strings and building
                     serialized strings. Default is comma ','
                      
    Examples:     
    
        var tags1 = TagString.create( { source: 'foo,bar' } );
        
        var tags2 = TagString.create( { source: [ 'fee', 'fie' ] } );
        
        var tags3 = TagString.create( { source: tags2 } );
        
        tags2.add(tags1);  // fee,fie,foo,bar
        tags2.toggle( ['fie','foo'], false ); // fee,bar
        tags3.remove('fee'); // fie
        
        
        var tags = TagString.combine(tags1, 'hip_hop,remix'); // 'foo,bar,hip_hop,remix'
*/

const NOT_FOUND = -1;

var defaultOpts = {
    ignore:  /^(\*|all)$/,
    invalid: /[^-a-zA-Z0-9_]/,
    separator:  ','
};

var TagString = function(opts) 
{
  if( !(this instanceof TagString) ) {
    return new TagString(opts);
  }

  if( !opts ) {
    opts = { source: null };
  } else if( !opts.hasOwnProperty('source') ) {
    opts = { source: opts };
  }

  for( var k in defaultOpts ) {
    this[k] = opts[k] || defaultOpts[k];
  }

  this._tagsArray = TagString.toArray(opts.source,this);

};

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

function merge( obj1, ...targets )
{
  targets.forEach( function(obj2) {
    for( var k in obj2 ) {
      if( obj2.hasOwnProperty(k) ) {
        obj1[k] = obj2[k];
      }
    }
  });

  return obj1;
}


TagString.prototype.add = function(tag) {
  
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

  TagString.toArray(tag,this).forEach( safeAddTag );
  return this;
};
        
TagString.prototype.remove = function(tagSpec) {
  var arr = this._tagsArray;

  function safeRemove(tag) {
      if( contains(arr,tag) ) {
        removeObject(arr,tag);
      }
  }

  TagString.toArray(tagSpec,this).forEach( safeRemove );
  return this;
};
        
TagString.prototype.replace = function(replaceThisSource,withThisSource) {
  if( replaceThisSource && (replaceThisSource !== withThisSource) ) {
    this.remove(replaceThisSource);
  }
  this.add(withThisSource);
  return this;
};
        
TagString.prototype.removeAll = function() {
  this._tagsArray = [ ];
  return this;
};
        
TagString.prototype.clear = TagString.prototype.removeAll;
        
TagString.prototype.isEmpty = function() {
  return this._tagsArray.length === 0;
};

TagString.prototype.toggle = function(tag,flag) {
  if( flag ) {
    this.add(tag);
  } else {
    this.remove(tag);
  }
  return this;
};
        
TagString.prototype.contains = function(tagsOrFunction) {
  if( typeof tagsOrFunction === 'function' ) {
    return find(this._tagsArray, tagsOrFunction) !== false;
  }
  var them = TagString.toArray(tagsOrFunction,this);
  return find( them, tag => this._tagsArray.contains(tag) ) !== false;
};

TagString.prototype.includes = TagString.prototype.contains;

TagString.prototype.containsOne = function(tag) {
  return this._tagsArray.contains(tag);
};

TagString.prototype.intersection = function(other) {
  var ret  = this; 
  if( this._tagsArray.length ) {
    var opts = this.copyOptions();
    var arr2 = TagString.toArray(other,opts);
    if( arr2.length ) {
      var arr1 = this._tagsArray.slice();
      opts.source = getIntersect(arr1,arr2);
      ret = new TagString(opts);
    }
  }
  return ret;
};

TagString.prototype.diff = function(returnTagsOnlyInThisOne) {
  var opts = this.copyOptions();
  opts.source = getDiff(this._tagsArray.slice(),TagString.toArray(returnTagsOnlyInThisOne,opts));
  return new TagString(opts);  
};

TagString.prototype.sort = function() {
  this._tagsArray.sort();
  return this;
};

TagString.prototype.isEqual = function(tags) {
  var other = new TagString(tags);
  if( !this._tagsArray.length || other._tagsArray.length !== this._tagsArray.length ) {
    return false;
  }
  if( this._tagsArray.length === 1 ) {
    return other._tagsArray[0] === this._tagsArray[0];
  }
  return other._tagsArray.sort().join(',') === this._tagsArray.sort().join(',');
};

TagString.prototype.anyInString = function(stringToSearch) {
  var str = (stringToSearch + '').toLowerCase();
  return this._tagsArray.find( tag => str.includes(tag) );
};

TagString.prototype.anyInArray = function(arrayOfStringsToSearch) {
  return arrayOfStringsToSearch
            .map( s => s.toLowerCase() )
            .find( this.anyInString.bind(this) );
};

TagString.prototype.clone = function() {
  var opts = this.copyOptions();
  opts.src = this._tagsArray;
  return new TagString( opts );
};

TagString.prototype.copyOptions = function() {
  return {
    ignore: this.ignore,
    invalid: this.invalid,
    separator: this.separator
  };
};

TagString.prototype.getLength = function() {
  return this._tagsArray.length;
};

TagString.prototype.toString = function() {
  var tagArr = this._tagsArray;
  if( tagArr.length > 0 ) {
      return tagArr.join(this.separator);
  }
  return '';
};

TagString.prototype.toArray = function() {
  return this._tagsArray;
};

TagString.prototype.forEach = function(callback,context) {
  this._tagsArray.forEach(callback,context || this);
  return this;
};
        
TagString.prototype.map = function(callback,context) {
  return this._tagsArray.map(callback,context || this);
};
    
TagString.prototype.filter = function(rgx) {
  var ts = new TagString();
  for( var i = 0; i < this._tagsArray.length; i++ ) {
    var t = this._tagsArray[i];
    if( t.match(rgx) ) {
      ts._tagsArray.push(t);
    }
  }
  return ts;
};

TagString.create = function(opts) {
  return new TagString(opts);
};

TagString.combine = function(tags1,tags2,opts) {
  if( !tags1 ) {
      return tags2;
  }
  if( tags2 ) {
      opts = merge( { source: tags1 }, opts || { } );
      return TagString.create(opts).add(tags2).toString();
  }
  return tags1;
};

TagString.contains = function(source,tag,opts) {
  opts = merge( { source }, opts || { } );
  return TagString.create(opts).contains(tag);
};        

TagString.forEach = function(source,callback,context,opts) {
  opts = merge( { source: source }, opts || { } );
  return TagString.create( opts ).forEach(callback,context);
};

TagString.filter = function(source,filter,opts) {
  opts = merge( { source: source }, opts || { } );
  return TagString.create( opts ).filter(filter);
};

TagString.toArray = function(source,useropts) {
  if( !source ) {
    return [ ];
  }

  var opts = merge( {}, defaultOpts );
  if( useropts ) {
    opts = merge(opts,useropts);
  }

  var arr = null;
  if( typeof(source) === 'string' ) {
    if( source.match(opts.ignore) )  {
      return [ ];
    }
    // still not 100% because '-'
    var r = new RegExp(opts.separator,'g');
    arr = source.replace(r,' ').split(/\s+/);
  } else if( Array.isArray(source) ) {
    arr = source.slice();        
  } else if( source && (source instanceof TagString) )  {
    arr = source._tagsArray.slice();        
  } else {
    arr = [ ];
  }
  return arr;
};


String.prototype.tagize = function(pretty) {
  var tu = TagString.create( { source: this } );
  var str = tu.toString();
  if( pretty ) {
    var rx = new RegExp(tu.separator,'g');
    str = str.replace(rx,tu.separator + ' ');
  }
  return str;
};


module.exports = TagString;
