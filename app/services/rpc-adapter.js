import ajax  from './ajax';
import env   from './env';

class RPCAdapter 
{
  constructor() {
    this.ajax   = ajax;
    this._cache  = false; // true;
  }

  call(cmd,isSingleton) {
    if( !this.rpcHost ) {
      this.rpcHost = env.rpcHost || 'http://ccmixter.org/api/';
    }
    
    var url = this.rpcHost + cmd;
    var opts = {
      url:      url,
      dataType: 'json',
      method:   'GET',
      cache:    this._cache, 
      xhrFields: { withCredentials: true },
      _ccmClientOnly: true
    };


    function _success(r) {
      if( isSingleton ) {
        r = r[0];
      }
      return r;
    }

    function _error(err) {
      throw err;
    }

    return this.ajax(opts).then( _success, _error );
  }

  callOne(cmd) {
    return this.call(cmd,true);
  }

  set cache(value) {
    this._cache = value;
  }

  get cache() {
    return this._cache;
  }
}

module.exports = new RPCAdapter();
