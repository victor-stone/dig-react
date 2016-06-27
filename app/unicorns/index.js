import pagingStats    from './paging-stats';
import TagString      from './tag-string';
import selectors      from './selectors';
import browserScripts from './browser-scripts';

const NOT_FOUND = -1;

// for all the crazy talk like this:
// http://stackoverflow.com/questions/3390396/how-to-check-for-undefined-in-javascript#3390426
// it turns out that babel is genering this particular way of testing ALL OVER THE PLACE
// so we might as well do it here
const isUndefined = obj => obj === undefined;

if (!Array.isArray) {
  Array.isArray = obj => Object.prototype.toString.call(obj) === '[object Array]';
}

if( isUndefined(Array.prototype.contains) ) {
  Array.prototype.contains = function(obj) {
    return this.indexOf(obj) !== NOT_FOUND;
  };
}

if( isUndefined(Array.prototype.includes) ) {
  Array.prototype.includes = Array.prototype.contains;
}

if( isUndefined(Array.prototype.remove) ) {  
  Array.prototype.remove = function(obj) {
    var index = this.indexOf(obj);
    if( index !== NOT_FOUND ) {
      this.splice(index,1);
    }
  };
}

if( isUndefined(Array.prototype.findBy) ) {
  Array.prototype.findBy = function(key,value) {
    var valIsDefined = !isUndefined(value);
    for( var i = 0; i < this.length; i++ ) {
      if( valIsDefined ) {
        if( this[i][key] === value ) {
          return this[i];
        }
      } else {
        if( this[i][key] ) {
          return this[i];
        }
      }
    }
    return null;
  };
}

if( isUndefined(Array.prototype.find) ) {
  Array.prototype.find = function(cb) {
    for( var i = 0; i < this.length; i++ ) {
      if( cb(this[i]) ) {
        return this[i];
      }
    }
    return undefined;
  };
}

if( isUndefined(Array.prototype.indexOfElement ) ) {
  Array.prototype.indexOfElement = function(key,value) {
    var valIsDefined = isUndefined(value);
    for( var i = 0; i < this.length; i++ ) {
      if( valIsDefined ) {
        if( this[i][key] === value ) {
          return i;
        }
      } else {
        if( this[i][key] ) {
          return i;
        }
      }
    }
    return NOT_FOUND;
  };
}

const _old_array_filter = Array.prototype.filter;

Array.prototype.filter = function(cb) {
  if( isUndefined(_old_array_filter) ) {
    var results = [];
    if( cb instanceof RegExp ) {
      for( var n = 0; n < this.length; n++ ) {
        if( this[n].match(cb) ) {
          results.push(this[n]);
        }
      }
    } else {
      for( var i = 0; i < this.length; i++ ) {
        if( cb( this[i], i ) ) {
          results.push(this[i]);
        }
      }
    }
    return results;
  } else {
    if( cb instanceof RegExp ) {
      cb = cb.test.bind(cb);
    }
    return _old_array_filter.apply(this,arguments);
  }
};


if( isUndefined(Array.prototype.match) ) {
  Array.prototype.match = function(regex) { return this.find(regex.test.bind(regex)); };
}

if( isUndefined(Array.prototype.filterBy) ) {
  Array.prototype.filterBy = function(key,value) {
    var results = [];
    var valIsDefined = typeof value !== 'undefined';
    for( var i = 0; i < this.length; i++ ) {
      if( valIsDefined ) {
        if( this[i][key] === value ) {
          results.push(this[i]);
        }
      } else {
        if( this[i][key] ) {
          results.push(this[i]);
        }
      }
    }
    return results;
  };
}

if( isUndefined(Array.prototype.rejectBy) ) {
  Array.prototype.rejectBy = function(key,value) {
    return this.filter( function(obj) {
      return obj[key] !== value;
    });
  };
}

const ELLIPSE = '...';

function ellipse(str,len) {
    if( str.length > len ) {
      return str.substr(0,len-ELLIPSE.length) + ELLIPSE;
    }
    return str;
}

function bindAll(obj,...arr) {
  bindAllTo(obj,obj,...arr);
}

function bindAllTo(obj,target,...arr) {
  for( const f of arr ) {
    obj[f] = target[f].bind(target);
  }
}

if( isUndefined(String.prototype.hashCode) ) {
  const HASH_SHIFT = 5;
  String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << HASH_SHIFT) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
}

function decamlize(str) {
  if( !str ) {
    return '';
  }
  return str.replace(/::/g, '/')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
            .replace(/([a-z\d])([A-Z])/g, '$1_$2')
            .replace(/(-|\s+)/g, '_')
            .toLowerCase();
}

function dasherize(str) {
  return decamlize(str).replace(/_/g,'-');
}

function underscore(str) {
  return w(trim(str)).join('_');
}

function camelize(str) {
  if( !str ) {
    return '';
  }
  return str.toLowerCase()
            .split('_')
            .map( s => s.charAt(0).toUpperCase() + s.substr(1) )
            .join('');
}

function commaize(value) {
  if( value === 0 || value === '0' ) {
      return '0';
  } else if( value ) {
      var regex = /([0-9]+)(([0-9]{3})($|,))/g;
      var str;
      var commaized = (value.string || value) + '';

      do {
          str = commaized;
          commaized = str.replace(regex,'$1,$2');
      } while( str !== commaized );

      return commaized;
  }
}

function trim(s) { 
  return s.replace(/^\s+/,'').replace(/\s+$/,''); 
}

function w(s) {
  return s.split(/\s+/);
}

const TRUNCATED_STRING_MAX = 10;
const TRUNCATED_WORD_MAX   = 5;

function sliceStr( {str='', maxWords = TRUNCATED_WORD_MAX, maxStr = TRUNCATED_STRING_MAX } ) {
  return str
          .trim()
          .split(' ')
          .slice( 0, maxWords )
          .map( s => s.length > maxStr ? s.substr(0,maxStr/2) + '...' : s )
          .join(' ');
}

if( !Object.values ) {
  Object.values = obj => Object.keys(obj).map(key => obj[key]);
}

var oassign = Object.assign || function (target,...sources) 
{ 
  sources.forEach( function(source) {
    for (var key in source) { 
      if (Object.prototype.hasOwnProperty.call(source, key)) { 
        target[key] = source[key]; 
      } 
    }
  });
  
  return target; 
};

function hashParams(params) {
  var keys = Object.keys(params);
  if( !keys.length ) {
    return '';
  }
  var keyo = {};
  keys.sort().forEach( k => keyo[k] = params[k] );    
  return JSON.stringify(keyo);
}

function mergeParams( oldp, ...newPs ) {
  var target = oassign( {}, oldp );
  var tagFields = [ 'tags', 'reqtags', 'oneof' ];
  for( var i = 0; i < newPs.length; i++ ) {
    var newp = newPs[i];
    for( var k in newp ) {
      var isRemoveParam  = k.match(/^--(.*)/);
      if( isRemoveParam ) {
        var realParamName = isRemoveParam[1];
        if( tagFields.contains(realParamName) ) {
          if( realParamName in target ) {
            target[realParamName] = (new TagString(target[realParamName])).remove(newp[k]).toString();
          }
        }
      } else {
        if( tagFields.contains(k) ) {
          if( target[k] ) {
            target[k] = (new TagString(target[k])).add( newp[k]).toString();
          } else {
            target[k] = newp[k];
          }
        } else {
          target[k] = newp[k];
        }
      }
    }
  }
  return target;
}

// cribbed from '_'
var debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      }
    }
  };

  return function() {
      context = this;
      args = arguments;
      timestamp = Date.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
};


function cleanSearchString(str) {
  return str.replace(/[^a-zA-Z0-9\s_()\*\.]/g,'').replace(/\b(with|the|a|an|for|to|in|of|at)\b/g,' ');
}

const DEFAULT_EXPIRY  = 30;
const DAYS_MULTIPLIER = 86400000; // 24*60*60*1000;

var cookies = {

  create(cname, cvalue, exdays) {
    exdays = exdays || DEFAULT_EXPIRY;
    var d = new Date();
    d.setTime(d.getTime() + (exdays*DAYS_MULTIPLIER));
    var expires = 'expires='+ d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
  },

  remove(cname) {
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC';  
  },

  value(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length,c.length);
        }
    }
    return '';
  }
};

module.exports = {
  bindAll,
  bindAllTo,
  browserScripts,
  camelize,
  cleanSearchString,
  commaize,
  cookies,
  dasherize,
  debounce,
  decamlize,
  ellipse,
  isUndefined,
  mergeParams,
  hashParams,
  oassign,
  pagingStats,
  selectors,
  sliceStr,
  trim,
  w,
  underscore,
  TagString,
};