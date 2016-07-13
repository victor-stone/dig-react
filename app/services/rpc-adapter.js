import querystring from 'querystring';
import ajax        from './ajax';
import env         from './env';

class RPCAdapter 
{
  constructor() {
    this.ajax   = ajax;
    this._cache  = !env.debugMode;
  }

  post(cmd,args) {
    return this._call(cmd,true,'POST',args);
  }

  patch(cmd,args) {
    return this._call(cmd,true,'POST' /*'PATCH'*/,args);
  }

  put(cmd,args) {
    return this._call(cmd,true,'POST' /*'PUT'*/,args);
  }

  call(cmd,isSingleton) {
    return this._call(cmd,isSingleton,'GET');
  }

  callOne(cmd) {
    return this._call(cmd,true,'GET');
  }

  _call(cmd,isSingleton,method,args) {
    if( !this.rpcHost ) {
      this.rpcHost = env.rpcHost || 'http://ccmixter.org/api/';
    }
    
    var url = this.rpcHost + cmd;
    var opts = {
      url:      url,
      dataType: 'json',
      method:   method,
      cache:    this._cache, 
      xhrFields: { withCredentials: true },
      _ccmClientOnly: true
    };

    if( args ) {
      opts.data = querystring.stringify(args);
    }

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

  set cache(value) {
    this._cache = value;
  }

  get cache() {
    return this._cache;
  }
}

module.exports = new RPCAdapter();
