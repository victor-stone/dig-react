import rsvp from 'rsvp';

class API
{
  constructor(transport) {
   this.transport = transport;
   this.cache = {};
   [ 'post', 'patch', 'on', 'once', 'emit', 'removeListener'].forEach( f => this[f] = transport[f].bind(transport) );
  }

  call(cmd,cacheCat) {
    if( cacheCat ) {
      if( this.cache[cacheCat]  && this.cache[cacheCat][cmd] ) {
          if( this.cache[cacheCat][cmd].promise ) {
            return this.cache[cacheCat][cmd].promise;
          } else if( this.cache[cacheCat][cmd].value ) {
            return rsvp.resolve(this.cache[cacheCat][cmd].value);
          }
      } else {
        this.cache[cacheCat]      = {};
        this.cache[cacheCat][cmd] = {};
      }
    }

    var promise = this.transport._call(cmd).then( result => {
      if( cacheCat ) {
        this.cache[cacheCat][cmd].promise = null;
        this.cache[cacheCat][cmd].value = result;          
      }
      return result;
    });

    if( cacheCat ) {
      this.cache[cacheCat][cmd].promise = promise;
    }

    return promise;
  }

  invalidateCacheCat(cacheCat) {
    this.cache[cacheCat] = null;
  }

}


module.exports = API;