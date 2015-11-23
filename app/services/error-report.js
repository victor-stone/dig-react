import ajax  from './ajax';
import env   from './env';

class ErrorReport
{
  constructor(err) {
    this.ajax = ajax;
    this.err  = err;
  }

  report() {
  
    var url = /*env.debugMode 
                ? 'http://localhost:3000/api/report'
                : */ 'http://' + env.appName + '.ccmixter.org/api/report';

    var eq = encodeURIComponent(this.err+'');
    var es = encodeURIComponent(this.err.stack);
    var q = `?err=${eq}&stack=${es}`;

    var opts = {
      url:      url + q,
      dataType: 'json',
      method:   'GET',
      cache:    false
    };

    function _success(r) {
      return r[0];
    }

    function _error(err) {
      throw err;
    }

    return this.ajax(opts)
              .then( _success, _error );
  }

}

module.exports = ErrorReport;
