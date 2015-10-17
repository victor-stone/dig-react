
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
var TagString = function(src) 
{
  var opts = {
    ignore:  /^(\*|all)$/,
    invalid: /[^-a-zA-Z0-9_]/,
    separator:  ','
  };

  if( src.hasOwnProperty('source') ) {
    opts = merge(opts,src);
  } else {
    opts.source = src;
  }
  merge(this,opts);
  
  this._tagsArray = [ ];
  if( this.source ) {
    this._tagsArray = this.toArray(this.source);
  }
}

function contains(arr,obj) {
  return arr.indexOf(obj) !== -1;
}

function removeObject(arr,obj) {
  arr.splice( arr.indexOf(obj), 1 );
}

function find(arr,obj,matcher)
{
  for( var i = 0; i < arr.length; i++ ) {
    if( matcher(arr[i]) === true ) {
      return true;
    }
  }
  return false;
}

function getIntersect(arr1, arr2) {
  var r = [], o = {}, l = arr2.length, i, v;
  for (i = 0; i < l; i++) {
    o[arr2[i]] = true;
  }
  l = arr1.length;
  for (i = 0; i < l; i++) {
    v = arr1[i];
    if (v in o) {
        r.push(v);
    }
  }
  return r;
}    

function merge( obj1, obj2 )
{
  for( var k in obj2 ) {
    if( obj2.hasOwnProperty(k) ) {
      obj1[k] = obj2[k];
    }
  }
  return obj1;
}


TagString.prototype.add = function(tag) {
  var ignore = this.ignore;
  var invalid = this.invalid;
  var arr = this._tagsArray;

  function safeAddTag(tag) {
    tag += ''; // stringize
    if( tag && 
        tag.match(ignore) === null &&
        tag.match(invalid) === null && 
        !contains(arr,tag) ) 
    {
      arr.push(tag);
    }
  }

  this.toArray(tag).forEach( safeAddTag );
  return this;
};
        
TagString.prototype.remove = function(tag) {
  var arr = this._tagsArray;
  function safeRemove(tag) {
      if( contains(arr,tag) ) {
        removeObject(arr,tag);
      }
  }
  this.toArray(tag).forEach( safeRemove );
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
        
TagString.prototype.clear = function() {
  return this.removeAll();
};
        
TagString.prototype.toggle = function(tag,flag) {
  if( flag ) {
    this.add(tag);
  } else {
    this.remove(tag);
  }
  return this;
};
        
TagString.prototype.contains = function(tag) {      
  var srcArr = this._tagsArray;
  return find( this.toArray(tag), function(tag) {
    return srcArr.contains(tag);
  });
};
        
TagString.prototype.intersection = function(other) {
  var opts = this.copyOptions();
  opts.source = getIntersect(this._tagsArray.slice(),this.toArray(other));
  return new TagString(opts);
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

TagString.prototype.forEach = function(callback,context) {
  this._tagsArray.forEach(callback,context || this);
  return this;
};
        
TagString.prototype.map = function(callback,context) {
  return this._tagsArray.map(callback,context || this);
};
    
TagString.prototype.toArray =function(source) {
  if( !source ) {
    return [ ];
  }
  var arr = null;
  if( typeof(source) === 'string' ) {
    if( source.match(this.ignore) )  {
      return [ ];
    }
    // still not 100% because '-'
    var r = new RegExp(this.separator,'g');
    arr = source.replace(r,' ').split(/\s+/);
  } else if( Array.isArray(source) ) {
    arr = source.slice();        
  } else if( source && source.hasOwnProperty('_tagsArray') ) {
    arr = source._tagsArray.slice();        
  } else {
    arr = [ ];
  }
  return arr;
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
  opts = merge( { source: source }, opts || { } );
  return TagString.create(opts).contains(tag);
};        

TagString.toArray = function(source,opts) {
  opts = merge( { source: source }, opts || { } );
  return TagString.create( opts )._tagsArray;
};

TagString.forEach = function(source,callback,context,opts) {
  opts = merge( { source: source }, opts || { } );
  return TagString.create( opts ).forEach(callback,context);
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

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

module.exports = TagString;
