import querystring from 'querystring';
import Eventer     from './eventer';
import ajax        from './ajax';
import events      from '../models/events';
import env         from './env';

class QueryAjaxAdapter extends Eventer
{
  constructor() {
    super(...arguments);
    this.ajax   = ajax;
    this._count = 0;
    this.queryHost = env.queryHost || 'http://ccmixter.org/api/query?';
  }

  _inc() {
      if( !this._count ) {
        this.emit( events.LOADING, true  );
      }
      ++this._count;
  }

  _dec() {
      --this._count;
      if( !this._count ) {
        this.emit( events.LOADING, false );
      }
    }

  _query(qString,isSingleton) {
  
    var url = this.queryHost + qString;

    var opts = {
      url:      url,
      dataType: 'json',
      method:   'GET',
      cache:    (typeof env.cacheRequests === 'undefined') ? env.cacheRequests : true
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

    this._inc();
    return this.ajax(opts)
              .then( _success, _error )
              .finally( () => this._dec() );
  }

  query(params) {
    return this._query(querystring.stringify(params),false);
  }
  
  queryOne    (params) {
    return this._query(querystring.stringify(params),true);
  }
}

module.exports = new QueryAjaxAdapter();
