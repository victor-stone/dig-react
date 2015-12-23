import ajax  from './ajax';
import env   from './env';

class RPCAdapter 
{
  constructor() {
    this.ajax   = ajax;
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
      cache:    false, 
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
}

module.exports = new RPCAdapter();
