import rsvp from 'rsvp';

class API
{
  constructor(transport) {
   this.transport = transport;
   this.cache = {};
  }

  call(cmd,cacheCat) {
    if( cacheCat ) {
      if( this.cache[cacheCat] ) {
        if( this.cache[cacheCat][cmd] ) {
          if( this.cache[cacheCat][cmd].promise ) {
            return this.cache[cacheCat][cmd].promise;
          } else if( this.cache[cacheCat][cmd].value ) {
            return rsvp.resolve(this.cache[cacheCat][cmd].value);
          }
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

  post() {
    return this.transport._post(...arguments);
  }
  
  patch() {
    return this.transport._patch(...arguments);
  }
  
  on() {
    this.transport.on(...arguments);
  }

  once() {
    this.transport.once(...arguments);
  }
  
  emit() {
    this.transport.emit(...arguments);
  }

  removeListener() {
    this.transport.removeListener(...arguments);
  }
}


module.exports = API;