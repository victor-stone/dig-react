import pagingStats    from './paging-stats';
import TagString      from './tag-string';
import browserScripts from './browser-scripts';
import _              from 'underscore';

const NOT_FOUND = -1;

if (!Array.isArray) {
  Array.isArray = _.isArray;
}

if( typeof Array.prototype.includes === 'undefined' ) {
  Array.prototype.includes = function(v) { 
    return this.indexOf(v) !== NOT_FOUND; 
  };
}

if( typeof Array.prototype.contains === 'undefined' ) {
  Array.prototype.contains = Array.prototype.includes;
}

if( typeof Array.prototype.remove === 'undefined' ) {  
  Array.prototype.remove = function(obj) {
    var index = this.indexOf(obj);
    if( index !== NOT_FOUND ) {
      this.splice(index,1);
    }
  };
}

if( typeof Array.prototype.findBy === 'undefined' ) {
  Array.prototype.findBy = function(key,value) {
    var valIsDefined = typeof value !== 'undefined';
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

if( typeof Array.prototype.find === 'undefined' ) {
  Array.prototype.find = function(cb) {
    for( var i = 0; i < this.length; i++ ) {
      if( cb(this[i]) ) {
        return this[i];
      }
    }
    return null;
  };
}

if( typeof Array.prototype.indexOfElement === 'undefined' ) {
  Array.prototype.indexOfElement = function(key,value) {
    var valIsDefined = typeof value !== 'undefined';
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

if( typeof Array.prototype.filter === 'undefined' ) {
  Array.prototype.filter = function(cb) {
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
  };
}

if( typeof Array.prototype.match === 'undefined' ) {
  Array.prototype.match = function(regex) {
    for( var n = 0; n < this.length; n++ ) {
      if( this[n].match(regex) ) {
        return this[n];
      }
    }
    return null;
  };
}

if( typeof Array.prototype.filterBy === 'undefined' ) {
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

if( typeof Array.prototype.rejectBy === 'undefined' ) {
  Array.prototype.rejectBy = function(key,value) {
    return this.filter( function(obj) {
      return obj[key] !== value;
    });
  };
}

const ELLIPSE = '...';

if( typeof String.prototype.ellipse === 'undefined' ) {
  String.prototype.ellipse = function(len) {
    if( this.length > len ) {
      return this.substr(0,len-ELLIPSE.length) + ELLIPSE;
    }
    return this;
  };
}

/*
var _oldLowerCase = String.prototype.toLowerCase;
var __env;
String.prototype.toLowerCase = function() {
  if( typeof this !== 'string' ) {
    throw new Error('bogus toLowerCase');
  }
  if( !__env ) {
    __env = require('../services/env');
  }
  __env.log('lowering: ' + this);
  return _oldLowerCase.apply(this);
};
*/

if( typeof String.prototype.hashCode === 'undefined' ) {
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

Object.values = obj => Object.keys(obj).map(key => obj[key]);

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
  browserScripts,
  camelize,
  cleanSearchString,
  commaize,
  cookies,
  dasherize,
  debounce,
  decamlize,
  mergeParams,
  hashParams,
  oassign,
  pagingStats,
  trim,
  w,
  underscore,
  TagString,
};