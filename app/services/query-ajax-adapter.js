import querystring from 'querystring';
import rsvp        from 'rsvp';
import Eventer     from './eventer';
import ajax        from './ajax';
import events      from '../models/events';
import env         from './env';

const LOADING_DELAY = 600; // ms 

class QueryAjaxAdapter extends Eventer
{
  constructor() {
    super(...arguments);
    this.ajax   = ajax;
    this._waiting = false;
    this._count = 0;
  }

  _inc() {
      if( !this._count ) {
        this._waiting = true;
        setTimeout( () => {
          if( this._count ) {
            this.emit( events.LOADING, true  );
          }
          this._waiting = false;
        }, LOADING_DELAY );
      }
      ++this._count;
  }

  _dec() {
      --this._count;
      if( !this._count && !this._waiting ) {
        this.emit( events.LOADING, false );
      }
    }

  _query(qString,queryHost) {
  
    var url = queryHost + qString;

    var opts = {
      url:      url,
      dataType: 'json',
      method:   'GET',
      cache:    !env.debugMode
    };

    function _success(r) {
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
    if( !this.queryHost ) {
      this.queryHost = env.queryHost || 'http://ccmixter.org/api/query?';
    }
    
    return this._query(querystring.stringify(params),this.queryHost);
  }
  
  queryOne(params) {
    return this.query(params).then( r => r[0] );
  }

  hash( obj ) {
    if( !this.queriesHost ) {
      this.queriesHost = env.queriesHost || 'http://ccmixter.org/api/queries?';
    }
    var strs = [];
    Object.keys(obj).forEach( k => strs.push( k + '=' + encodeURIComponent(querystring.stringify(obj[k]))) );
    if( strs.length === 0 ) {
      return rsvp.resolve(obj);
    }
    var qstring = strs.join('&');
    return this._query(qstring,this.queriesHost).then( r => r[0] );
  }
}

module.exports = new QueryAjaxAdapter();
