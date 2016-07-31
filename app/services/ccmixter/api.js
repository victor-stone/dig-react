import rsvp from 'rsvp';
import { bindAllTo } from 'unicorns';

class API
{
  constructor(transport) {
   this.transport = transport;
   this.cache = new Map();
   this.cacheCats = new Map();

   bindAllTo(this, transport, 'post', 'patch', 'on', 'once', 'emit', 'removeListener');
   this.get = this.call; // for completeness   
  }

  _addCmdToCat(cacheCat,cmd) {
    if( !this.cacheCats.has(cacheCat) ) {
      this.cacheCats.set(cacheCat,new Set());
    }
    this.cacheCats.get(cacheCat).add(cmd);
  }

  call(cmd,cacheCat) {
    if( cacheCat ) {
      const { promise, value } = this.cache.get(cmd) || {};
      if( promise ) {
        return promise;
      }
      if( value ) {
        return rsvp.resolve(value);
      }
    }

    var promise = this.transport._call(cmd).then( value => {
      if( cacheCat ) {
        this.cache.set(cmd,{ promise: null, value });
      }
      return value;
    });

    if( cacheCat ) {
      this._addCmdToCat(cacheCat,cmd);
      this.cache.set(cmd,{promise});
    }

    return promise;
  }

  invalidateCacheCat(cacheCat) {
    var cats = this.cacheCats.get(cacheCat)||[];

    [...cats].forEach( cc => this.cache.delete(cc) );
  }

}


module.exports = API;