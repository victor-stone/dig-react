import ajax  from './ajax';
import env   from './env';

class PageAdapter 
{
  constructor() {
    this.ajax   = ajax;
  }

  fetch(pageName) {
    if( !this.pageHost ) {
      this.pageHost = env.pageHost || 'http://'+env.appName+'.ccmixter.org/';
    }
    
    var url = this.pageHost + pageName + '.html';
    var opts = {
      url:      url,
      dataType: 'html',
      method:   'GET',
      cache:    false, 
    };


    function _success(r) {
      return r;
    }

    function _error(err) {
      throw err;
    }

    return this.ajax(opts).then( _success, _error );
  }

}

module.exports = new PageAdapter();
