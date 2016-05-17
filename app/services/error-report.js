import ajax  from './ajax';
//import env   from './env';
import rsvp  from 'rsvp';

class ErrorReport
{
  constructor(err) {
    this.ajax = ajax;
    this.err  = err;
  }

  report() {
    return rsvp.resolve('noted');
    /*
    var url = 'http://' + env.appName + '.ccmixter.org/api/report';

    var eq = encodeURIComponent(this.err+'');
    var es = encodeURIComponent(this.err.stack);
    var q = `?err=${eq}&stack=${es}`;

    var opts = {
      url:      url + q,
      dataType: 'js',
      method:   'GET',
      cache:    false
    };

    function _success(r) {
      return r[0];
    }

    function _error(err) {
      throw err;
    }

    return this.ajax(opts).then( _success, _error );
    */
  }

}

module.exports = ErrorReport;
