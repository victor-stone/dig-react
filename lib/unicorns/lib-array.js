
const NOT_FOUND = -1;

const isUndefined = obj => obj === undefined;

// inheriting from Array just isn't supported 
// by enough places (including Babel and Node < 6)

// class LibArray extends Array 
Object.assign(Array.prototype, {
  
  indexOfElement(key,value) {
    const valIsDefined = !isUndefined(value);
    const len = this.length;
    for( var i = 0; i < len; i++ ) {
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
  },

  includes(v) {
    return this.indexOf(v) !== NOT_FOUND;
  },

  contains(v) {
    return this.indexOf(v) !== NOT_FOUND;
  },

  findBy(key,value) {
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
  },

  match(regex) { 
    return this.find(regex.test.bind(regex)); 
  }

});

module.exports = Array;
